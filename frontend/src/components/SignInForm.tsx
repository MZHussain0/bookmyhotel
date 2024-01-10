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
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import * as apiClient from "../api-client";

const formSchema = z.object({
  email: z.string().email({
    message: "Must be a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type LoginFormData = z.infer<typeof formSchema>;

const SignInForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation(apiClient.login, {
    onSuccess: async () => {
      toast.success("You are now logged In!");
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
        className="grow flex flex-col gap-4 p-4 w-full  bg-slate-900 px-4 py-8 rounded-lg shadow-inner shadow-theme-200 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-theme-100 py-4 text-center">
          Login in to your account
        </h1>

        {/* email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full max-w-lg mx-auto">
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
            <FormItem className="w-full max-w-lg mx-auto">
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

        <div className="flex items-center justify-between max-w-lg mx-auto w-full ">
          <span className="text-theme-200 ">
            <Link to="/register" className="hover:text-theme-100">
              Don't have an account?{" "}
              <span className="underline font-semibold">Register</span>
            </Link>
          </span>
          <Button
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            className="max-w-52 w-full  text-xl bg-theme-400 hover:bg-theme-400/90 text-white">
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
