import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import * as apiClient from "../api-client";

const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Must be a valid email.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof formSchema>;

const RegisterationForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      toast.success("registeration successfull!");
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-theme-100">Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-4">
          {/* first name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel
                  className={cn(
                    "font-semibold text-base capitalize",
                    form.formState.errors.firstName && "text-muted-foreground"
                  )}>
                  First Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="first name" {...field} className="py-6" />
                </FormControl>
                <FormMessage className="text-rose-400" />
              </FormItem>
            )}
          />

          {/* last name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel
                  className={cn(
                    "font-semibold text-base capitalize",
                    form.formState.errors.lastName && "text-muted-foreground"
                  )}>
                  Last name
                </FormLabel>
                <FormControl>
                  <Input placeholder="last name" {...field} className="py-6" />
                </FormControl>
                <FormMessage className="text-rose-400" />
              </FormItem>
            )}
          />
        </div>

        {/* email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel
                className={cn(
                  "font-semibold text-base capitalize",
                  form.formState.errors.email && "text-muted-foreground"
                )}>
                Email address
              </FormLabel>
              <FormControl>
                <Input placeholder="xyz@xyx.com" {...field} className="py-6" />
              </FormControl>
              <FormMessage className="text-rose-400" />
            </FormItem>
          )}
        />

        {/* password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel
                className={cn(
                  "font-semibold text-base capitalize",
                  form.formState.errors.password && "text-muted-foreground"
                )}>
                Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="password"
                  {...field}
                  className="py-6"
                />
              </FormControl>
              <FormMessage className="text-rose-400" />
            </FormItem>
          )}
        />

        {/* confirm password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel
                className={cn(
                  "font-semibold text-base capitalize",
                  form.formState.errors.firstName && "text-muted-foreground"
                )}>
                confirm password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="enter the password again."
                  {...field}
                  className="py-6"
                />
              </FormControl>
              <FormMessage className="text-rose-400" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          className="max-w-md w-full mx-auto text-xl bg-theme-400 hover:bg-theme-400/90 text-white">
          Create Account
        </Button>
      </form>
    </Form>
  );
};

export default RegisterationForm;
