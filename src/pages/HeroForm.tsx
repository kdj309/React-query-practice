import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/App";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  alterEgo: z.string(),
});
type hero = {
  name: string;
  id: number;
  alterEgo: string;
};
const addHero = (hero: hero) => {
  return axios.post(
    "https://silver-happiness-j97r6xqp45phpwvp-4000.app.github.dev/superheroe",
    hero
  );
};
export function ProfileForm() {
  const { mutate } = useMutation({2
    mutationFn: addHero,
    mutationKey: ["add-super-heroes"],
    // onSuccess(data, _variables, _context) {
    //   // queryClient.invalidateQueries({queryKey:["super-heros"]})
    //   queryClient.setQueryData(["super-heros"], (olddata) => {
    //     console.log(olddata);
    //     return {
    //       ...olddata,
    //       data: [...olddata.data, data.data],
    //     };
    //   });
    // },
    onMutate(newhero) {
      const previousData = queryClient.getQueryData(["super-heros"]);
      queryClient.setQueryData(["super-heros"], (olddata) => {
        console.log(olddata);
        return {
          ...olddata,
          data: [...olddata.data, newhero],
        };
      });
      return {
        previousData,
      };
    },
    onError(_error, _variables, context) {
      queryClient.setQueryData(["super-heros"], context?.previousData);
    },
    onSettled(_data, _error, _variables, _context) {
      queryClient.invalidateQueries({ queryKey: ["super-heros"] });
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      alterEgo: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutate({
      id: Date.now(),
      name: values.name,
      alterEgo: values.alterEgo,
    });
    form.reset();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alterEgo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>alterEgo</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
