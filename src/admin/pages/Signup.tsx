import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { data } from "react-router-dom";
import z from "zod";
import axios from "axios";

function Signup() {
  const api_url = "https://68219a2d259dad2655afc2ba.mockapi.io/";
  // input validation using zod

  const signupSchema = z
    .object({
      firstName: z.string().min(2, { message: "First name is required" }),
      lastName: z.string().min(2, { message: "Last name is required" }),
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "this email is no valid" }),
      password: z
        .string()
        .min(6, { message: "Password must be is least 6 characters" }),
      confirmPassword: z
        .string()
        .min(2, { message: "Confirm password name is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Confirm password is not match password",
      path: ["confirmPassword"],
    });

  // to create type to data using zod
  type InputSignup = z.infer<typeof signupSchema>;
  //this is react hook form using register and their is another submitted handler  that name controller
  const {
    handleSubmit,
    register,
    // reset,
    formState: { isSubmitting, errors },
  } = useForm<InputSignup>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
  });
  const onSubmit: SubmitHandler<InputSignup> = (i) => {
    const userInfo = {
      firstName: i.firstName,
      lastName: i.lastName,
      email: i.email,
      password: i.password,
    };
    // this to reset input filed
    // reset()
    console.log(userInfo);

    // const isExists = async (email: string): Promise<boolean> => {
    //   try {
    //     const response = await axios.get(`${api_url}/adminUser`);
    //     const userExists = response.data.some((u: { email: string }) => {
    //       return u.email === userInfo.email;
    //     });
    //     if (userExists) {
    //       alert("This email is already registered.");
    //       return
    //     }

    //     return userExists;
    //   } catch (error) {
    //     console.error("Error checking if user exists:", error);
    //     return false;
    //   }
    // };
    // isExists();
    // const postUser = async () => {
    //   console.log("here");
    //   try {
    //     const response = await axios.post(`${api_url}/adminUser`, userInfo);
    //     console.log("User created:", response.data);
    //     console.log(response.data);

    //     return response.data;
    //   } catch (error) {
    //     throw error;
    //   }
    // };

    // postUser();

    const isExists = async (email: string): Promise<boolean> => {
      try {
        const response = await axios.get(`${api_url}/adminUser`);
        const userExists = response.data.some(
          (u: { email: string }) => u.email === email
        );

        if (userExists) {
          alert("This email is already registered.");
        }

        return userExists;
      } catch (error) {
        console.error("Error checking if user exists:", error);
        return false;
      }
    };

    const postUser = async (userInfo: UserInfo): Promise<void> => {
      try {
        const exists = await isExists(userInfo.email); // تحقق أولًا من الإيميل

        if (exists) return; // لا تسجل المستخدم إذا موجود

        const response = await axios.post(`${api_url}/adminUser`, userInfo);
        console.log("User created:", response.data);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };
  };
  return (
    <div className="flex flex-col min-h-screen max-w-screen justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col shadow-2xl  rounded-lg gap-4 w-100 border border-gray-600/20 px-3">
          <p className="text-center font-bold text-2xl my-3">Admin Signup</p>
          <input
            className="focus:outline-0 px-1 border border-gray-600/50 rounded-sm"
            type="text"
            placeholder="Enter your first name"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className="text-red-800 text-sm ">
              {errors.firstName.message}
            </span>
          )}
          <input
            className="focus:outline-0 px-1 border border-gray-600/50 rounded-sm"
            type="text"
            placeholder="Enter your last name"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="text-red-800 text-sm ">
              {errors.lastName.message}
            </span>
          )}
          <input
            className="focus:outline-0 px-1 border border-gray-600/50 rounded-sm"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-800 text-sm ">
              {errors.email.message}
            </span>
          )}
          <input
            className="focus:outline-0 px-1 border border-gray-600/50 rounded-sm"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-800 text-sm ">
              {errors.password.message}
            </span>
          )}
          <input
            className="focus:outline-0 px-1 border border-gray-600/50 rounded-sm"
            type="password"
            placeholder="Enter your confirm password"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (
            <span className="text-red-800 text-sm ">
              {errors.confirmPassword.message}
            </span>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-sm font-medium bg-blue-700 rounded-sm text-white p-1 my-2"
          >
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
