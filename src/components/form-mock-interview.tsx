import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";

import type { Interview } from "@/types";

import { CustomBreadCrumb } from "./custom-bread-crumb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Headings } from "./headings";
import { Button } from "./ui/button";
import { Loader, Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { chatSession } from "@/scripts";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";

interface FormMockInterviewProps {
    initialData: Interview | null;
}

const formSchema = z.object({
    position: z
        .string()
        .min(1, "Position is required")
        .max(100, "Position must be 100 characters or less"),
    description: z.string().min(10, "Description is required"),
    experience: z
        .number()
        .min(0, "Experience cannot be negative")
        .int("Experience must be a whole number"),
    techStack: z.string().min(1, "Tech stack must be at least a character"),
});

type FormData = z.infer<typeof formSchema>;

export const FormMockInterview = ({ initialData }: FormMockInterviewProps) => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            position: initialData?.position || "",
            description: initialData?.description || "",
            experience: initialData?.experience ?? 0,
            techStack: initialData?.techStack || "",
        },
        mode: "onChange",
    });

    const { isSubmitting } = form.formState;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { userId } = useAuth();

    const title = initialData
        ? initialData.position
        : "Create a new mock interview";

    const breadCrumpPage = initialData ? initialData?.position : "Create";
    const actions = initialData ? "Save Changes" : "Create";
    const toastMessage = initialData
        ? { title: "Updated..!", description: "Changes saved successfully..." }
        : { title: "Created..!", description: "New Mock Interview created..." };

    const cleanAiResponse = (responseText: string) => {
        // Step 1: Trim any surrounding whitespace
        let cleanText = responseText.trim();

        // Step 2: Remove any occurrences of "json" or code block symbols (``` or `)
        cleanText = cleanText.replace(/(json|```|`)/gi, "");

        // Step 3: Extract a JSON array by capturing text between square brackets
        const jsonArrayMatch = cleanText.match(/\[.*\]/s);
        if (jsonArrayMatch) {
            cleanText = jsonArrayMatch[0];
        } else {
            throw new Error("No JSON array found in response");
        }

        // Step 4: Parse the clean JSON text into an array of objects
        try {
            return JSON.parse(cleanText);
        } catch (error) {
            throw new Error("Invalid JSON format: " + (error as Error)?.message);
        }
    };

    const generateAiResponse = async (data: FormData) => {
        const prompt = `
        As an experienced prompt engineer, generate a JSON array containing 5 technical interview questions along with detailed answers based on the following job information. Each object in the array should have the fields "question" and "answer", formatted as follows:

        [
          { "question": "<Question text>", "answer": "<Answer text>" },
          ...
        ]

        Job Information:
        - Job Position: ${data?.position}
        - Job Description: ${data?.description}
        - Years of Experience Required: ${data?.experience}
        - Tech Stacks: ${data?.techStack}

        The questions should assess skills in ${data?.techStack} development and best practices, problem-solving, and experience handling complex requirements. Please format the output strictly as an array of JSON objects without any additional labels, code blocks, or explanations. Return only the JSON array with questions and answers.
        `;

        try {
            const aiResult = await chatSession.sendMessage(prompt);
            const cleanedResponse = cleanAiResponse(aiResult.response.text());
            return cleanedResponse;
        } catch (error) {
            console.error("AI Response Error:", error);
            toast.error("AI Generation Error", {
                description: "Failed to generate interview questions. Please try again.",
            });
            throw error;
        }
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        // First check if form is valid
        const isValid = await form.trigger();
        if (!isValid) {
            toast.error("Validation Error", {
                description: "Please fix the errors in the form before submitting.",
            });
            return;
        }

        try {
            setLoading(true);

            if (initialData) {
                // update
                const aiResult = await generateAiResponse(data);

                await updateDoc(doc(db, "interviews", initialData?.id), {
                    questions: aiResult,
                    ...data,
                    updatedAt: serverTimestamp(),
                }).catch((error) => {
                    console.log(error);
                    throw error;
                });
                toast(toastMessage.title, { description: toastMessage.description });
            } else {
                // create a new mock interview
                const aiResult = await generateAiResponse(data);

                await addDoc(collection(db, "interviews"), {
                    ...data,
                    userId,
                    questions: aiResult,
                    createdAt: serverTimestamp(),
                });

                toast(toastMessage.title, { description: toastMessage.description });
            }

            navigate("/generate", { replace: true });
        } catch (error) {
            console.log("Submission Error:", error);
            toast.error("Error", {
                description: `Failed to ${initialData ? "update" : "create"} mock interview. Please try again.`,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (initialData) {
            form.reset({
                position: initialData.position,
                description: initialData.description,
                experience: initialData.experience,
                techStack: initialData.techStack,
            });
        }
    }, [initialData, form]);

    return (
        <div className="w-full flex-col space-y-4">
            <CustomBreadCrumb
                breadCrumbPage={breadCrumpPage}
                breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
            />

            <div className="mt-4 flex items-center justify-between w-full">
                <Headings title={title} isSubHeading />

                {initialData && (
                    <Button size={"icon"} variant={"ghost"}>
                        <Trash2 className="min-w-4 min-h-4 text-red-500" />
                    </Button>
                )}
            </div>

            <Separator className="my-4" />

            <div className="my-6"></div>

            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full p-8 rounded-lg flex-col flex items-start justify-start gap-6 shadow-md "
            >
                <Controller
                    control={form.control}
                    name="position"
                    render={({ field, fieldState }) => (
                        <div className="w-full space-y-4">
                            <div className="w-full flex items-center justify-between">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Job Role / Job Position
                                </label>
                                {fieldState.error && (
                                    <span className="text-sm text-red-500">{fieldState.error.message}</span>
                                )}
                            </div>
                            <Input
                                className="h-12"
                                disabled={loading}
                                placeholder="eg:- Full Stack Developer"
                                {...field}
                                value={field.value || ""}
                            />
                        </div>
                    )}
                />

                <Controller
                    control={form.control}
                    name="description"
                    render={({ field, fieldState }) => (
                        <div className="w-full space-y-4">
                            <div className="w-full flex items-center justify-between">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Job Description
                                </label>
                                {fieldState.error && (
                                    <span className="text-sm text-red-500">{fieldState.error.message}</span>
                                )}
                            </div>
                            <Textarea
                                className="h-12"
                                disabled={loading}
                                placeholder="eg:- describle your job role"
                                {...field}
                                value={field.value || ""}
                            />
                        </div>
                    )}
                />

                <Controller
                    control={form.control}
                    name="experience"
                    render={({ field, fieldState }) => (
                        <div className="w-full space-y-4">
                            <div className="w-full flex items-center justify-between">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Years of Experience
                                </label>
                                {fieldState.error && (
                                    <span className="text-sm text-red-500">{fieldState.error.message}</span>
                                )}
                            </div>
                            <Input
                                type="number"
                                className="h-12"
                                disabled={loading}
                                placeholder="eg:- 5 Years"
                                {...field}
                                value={field.value || ""}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                        </div>
                    )}
                />

                <Controller
                    control={form.control}
                    name="techStack"
                    render={({ field, fieldState }) => (
                        <div className="w-full space-y-4">
                            <div className="w-full flex items-center justify-between">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Tech Stacks
                                </label>
                                {fieldState.error && (
                                    <span className="text-sm text-red-500">{fieldState.error.message}</span>
                                )}
                            </div>
                            <Textarea
                                className="h-12"
                                disabled={loading}
                                placeholder="eg:- React, Typescript..."
                                {...field}
                                value={field.value || ""}
                            />
                        </div>
                    )}
                />

                <div className="w-full flex items-center justify-end gap-6">
                    <Button
                        type="button"
                        onClick={() => {
                            form.reset({
                                position: initialData?.position || "",
                                description: initialData?.description || "",
                                experience: initialData?.experience || 0,
                                techStack: initialData?.techStack || "",
                            });
                        }}
                        size={"sm"}
                        variant={"outline"}
                        disabled={isSubmitting || loading}
                    >
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        size={"sm"}
                        disabled={isSubmitting || loading}
                    >
                        {loading ? (
                            <Loader className="text-gray-50 animate-spin" />
                        ) : (
                            actions
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};