import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";

import { SigninValidation } from "@/lib/validation";
import { useSignInAccount } from "@/lib/react-query/queries"
import { useUserContext } from "@/context/AuthContext";
import { logoImg } from "@/utils";

// 定义SigninForm组件
const SigninForm = () => {
  // 使用useToast钩子获取toast方法
  const { toast } = useToast();
  // 使用useNavigate钩子获取navigate方法
  const navigate = useNavigate();
  // 使用useUserContext钩子获取checkAuthUser和isUserLoading方法
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  // 使用useSignInAccount钩子获取signInAccount和isLoading方法
  const { mutateAsync: signInAccount, isLoading } = useSignInAccount();

  // 使用useForm钩子获取form对象
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 处理登录表单的提交事件
  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    // 调用signInAccount方法进行登录
    const session = await signInAccount(user);

    // 如果登录失败
    if (!session) {
      // 弹出登录失败的提示
      toast({ title: "Login failed. Please try again." });
      
      return;
    }

    // 调用checkAuthUser方法检查用户是否登录成功
    const isLoggedIn = await checkAuthUser();

    // 如果登录成功
    if (isLoggedIn) {
      // 重置表单
      form.reset();

      // 跳转到首页
      navigate("/");
    } else {
      // 弹出登录失败的提示
      toast({ title: "登录失败,请再试一次.", });
      
      return;
    }
  };

  // 返回登录表单
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src={logoImg} alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details.
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isLoading || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Log in"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

// 导出SigninForm组件
export default SigninForm;