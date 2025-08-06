import {Button, Link as ChakraLink, Field, Flex, Heading, HStack, Image, Input, Stack, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import loginImage from "../../public/assets/login-image.gif";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import z, { email } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInFormSchema = z.object({
  email: z.email("O e-mail é obrigatório").nonempty("Digite um e-mail válido"),
  password: z.string().nonempty("A senha é obrigatória").min(8,"A senha deve ter pelo menos 8 caracteres"),
});

type SignInFormData = z.infer<typeof signInFormSchema>;

export default function Login() {

    const { register, handleSubmit, formState: {errors} } = useForm({
      resolver: zodResolver(signInFormSchema)
    });

    function handleSignIn(data: SignInFormData){
      console.log(data);
    }

    return (
        <Flex w="100vw" h="100vh">
          <Flex w="50%" bg="#2C73EB" align={"center"} justify={"center"}>
            <Image w={500} h={500} src={loginImage.src} />
          </Flex>
          <VStack w="50%" justify="center">
            <Stack>
              <Heading as="h1" color="black" fontSize="3xl" fontWeight="bold">Login</Heading>

              <Text color="gray.400" fontWeight="normal" fontSize="lg">Se você já é membro, você pode fazer login com seu endereço de e-mail e senha.</Text>


          <form onSubmit={handleSubmit(handleSignIn)}>
            <VStack align="flex-start" gap={6} mt={10}>
              <Field.Root invalid={!!errors.email}>
              <Field.Label color="gray.500" fontSize="md">
                Email <Field.RequiredIndicator />
              </Field.Label>
              <Input type="email" colorPalette="blue" h={16} borderRadius="md" color="black" {...register("email")} />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>

            </Field.Root>
             <Field.Root invalid={!!errors.password}>
              <Field.Label color="gray.500" fontSize="md">
                Senha <Field.RequiredIndicator />
              </Field.Label>
               <PasswordInput colorPalette="blue" h="16" borderRadius="md" color="black" {...register("password")} />
               <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>
            <Checkbox colorPalette="blue" color="gray.500" fontSize="md" fontWeight="medium">
              Lembre-me
            </Checkbox>

            <Button type="submit"w="full" h="16" colorPalette="blue" borderRadius="md" fontSize="md" fontWeight="medium">Entrar</Button>
          </VStack>
          </form>

             <HStack justify="center" gap={1} mt={10}>
                <Text color="gray.500" fontSize="md" fontWeight="medium">Não possui uma conta?</Text>
                <ChakraLink asChild color="gray.500">
                  <NextLink href="/sign-up">Cadastre-se</NextLink>
                </ChakraLink>

              </HStack>


            </Stack>
          </VStack>
        </Flex>
    )
}
