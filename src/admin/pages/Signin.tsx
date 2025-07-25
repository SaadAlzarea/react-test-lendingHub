import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function Signin() {
  const api_url = "https://68219a2d259dad2655afc2ba.mockapi.io/";

  // Zod schema
  const signinSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  type InputSignin = z.infer<typeof signinSchema>;

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<InputSignin>({
    mode: "onChange",
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: InputSignin) => {
    try {
      const response = await axios.get(`${api_url}/adminUser`);
      const users = response.data;

      const matchedUser = users.find(
        (user: { email: string; password: string }) =>
          user.email === data.email && user.password === data.password
      );

      if (matchedUser) {
        alert("Login successful!");
        console.log("User logged in:", matchedUser);
        // navigate to dashboard or save to localStorage if needed
      } else {
        alert("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during signin:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-screen justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col shadow-2xl rounded-lg gap-4 w-[320px] sm:w-[400px] border border-gray-600/20 px-4 py-6">
          <p className="text-center font-bold text-2xl">Admin Signin</p>

          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-800 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-800 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Signin;
