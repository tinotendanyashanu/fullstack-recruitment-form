"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { Card, CardBody } from "@heroui/card";

const YEARS = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year or Higher" },
  { value: "Grad", label: "Graduate" },
];

export default function ApplicationForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const validateFile = (fileList: FileList | null) => {
    if (!fileList || !fileList[0]) return true;
    return fileList[0].size <= 4 * 1024 * 1024; // 4MB
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";


  const onSubmit = async (data: any) => {
    if (!apiUrl) {
      alert("API URL is not configured.");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList) {
        if (value.length > 0) formData.append(key, value[0]);
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      const res = await fetch(`${apiUrl}/api/applicants/`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        reset();
        router.push("/thank-you");
      } else {
        alert("There was an error submitting your application.");
      }
    } catch (error) {
      alert("Network error, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name", { required: true })}
            isInvalid={!!errors.name}
            errorMessage="Name is required"
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@email.com"
            {...register("email", { required: true })}
            isInvalid={!!errors.email}
            errorMessage="Email is required"
          />
          <Input
            label="Phone"
            placeholder="Phone number"
            {...register("phone", { required: true })}
            isInvalid={!!errors.phone}
            errorMessage="Phone is required"
          />
          <Input
            label="City"
            placeholder="City of residence"
            {...register("city", { required: true })}
            isInvalid={!!errors.city}
            errorMessage="City is required"
          />
          <Input
            label="University"
            placeholder="University name"
            {...register("university", { required: true })}
            isInvalid={!!errors.university}
            errorMessage="University is required"
          />
          <Input
            label="Major / Field of Study"
            placeholder="Your major"
            {...register("major", { required: true })}
            isInvalid={!!errors.major}
            errorMessage="Major is required"
          />
          <Select
            label="Year of Study"
            isInvalid={!!errors.year_of_study}
            {...register("year_of_study", { required: true })}
          >
            {YEARS.map((y) => (
              <SelectItem key={y.value} textValue={y.value}>
                {y.label}
              </SelectItem>
            ))}
          </Select>
          <Textarea
            label="Motivation"
            placeholder="Tell us why you want to join (optional)"
            {...register("motivation")}
          />
          <Input
            label="CV (PDF/DOCX, max 4MB)"
            type="file"
            accept=".pdf,.docx"
            {...register("cv", {
              required: true,
              validate: validateFile,
            })}
            isInvalid={!!errors.cv}
            errorMessage="CV is required and must be under 4MB"
          />
          <Input
            label="Cover Letter (PDF/DOCX, max 4MB)"
            type="file"
            accept=".pdf,.docx"
            {...register("cover_letter", {
              required: true,
              validate: validateFile,
            })}
            isInvalid={!!errors.cover_letter}
            errorMessage="Cover letter required, max 4MB"
          />
          <Input
            label="Supporting Documents (optional, PDF/DOCX, max 4MB)"
            type="file"
            accept=".pdf,.docx"
            {...register("supporting_documents", {
              validate: validateFile,
            })}
            isInvalid={!!errors.supporting_documents}
            errorMessage="Max 4MB"
          />
          <Button
            type="submit"
            color="primary"
            isLoading={submitting}
            className="w-full font-bold"
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
