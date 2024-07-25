import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SignupValidation } from "@/lib/validation"
import { logoImg } from "@/utils"
import Loader from "@/components/shared/Loader"
import { Link } from "react-router-dom"
import { createUserAccount } from "@/lib/appwrite/api"
import { useToast } from "@/components/ui/use-toast"



//54.48. Form validation with zod and react-hook-form
const SignupFrom = () => {
  const { toast } = useToast()
  const isLoading = false
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  })

  // const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } = useCreateUserAccount();

  // 1.27.36 Define a submit handler.
 async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // const newUser = await createUserAccount(values)
    const newUser = await createUserAccount(values)

    if (!newUser) {
      toast({ title: "Sign up failed. Please try again.", });
      
      return;
    }

    // const session = await signInAccount({
    //   email: user.email,
    //   password: user.password,
    // });
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src={logoImg} alt="logo"  />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use snapgram, Please enter your details
        </p>
      </div>
    <div>
      <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
          {/* 注册加载 */}
        <Button type="submit" className="shad-button_primary">
          {isLoading ? (
            <div className="flex-center gap-2">
              <Loader />  Loading...
            </div>
          ):"Sign Up"}
        </Button>

        <p className="text-small-regular text-light-2 text-center mt-2"> 
          Already have an account? <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
        </p>
      </form>
      </div>
    </Form>
  )
}

export default SignupFrom


/* 
  注册功能：
     1. 用户名、邮箱、密码输入框
     2. 注册按钮
  主要事项：
    1.多次注册会导致第三方库被屏蔽
      报错信息:'Third-party cookie will be blocked in future Microsoft Edge versions as part of unpartitioned third-party cookie deprecation.'
      解决方案：
          1.更新浏览器 
          2.在注册时，不使用第三方库，使用原生js实现注册功能[不推荐]
          3.检查浏览器设置问题 [推荐]
    已测试：
      1.用户注册完成,如再次注册需要30秒的冷缺时间,还是会出现这个问题

*/
