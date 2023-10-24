import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Text, Center, Heading, ScrollView, useToast} from 'native-base';
import {useForm, Controller} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { useState } from 'react';


import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { useAuth } from '@hooks/useAuth';


import LogoSvg from "@assets/logo.svg"
import BackgroundImg from "@assets/background.png"
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { AppError } from '@utils/AppError';

type FormData ={
    email:string;
    password:string;
}

const signInSchema = yup.object({
    email: yup.string().required("Informe o e-email.").email("E-mail inválido."),
    password: yup.string().required("Informe a senha.").min(6, "A senha deve ter pelo menos 6 dígitos."),
});

export function SignIn(){
    const [isLoading, setIsLoading] = useState(false); 
    const {signIn} = useAuth();
    const navigation = useNavigation<AuthNavigatorRoutesProps>();   
    const toast = useToast();  


    const {control, handleSubmit, formState:{errors}} = useForm<FormData>({
        resolver: yupResolver(signInSchema)
    });


    function handleNewAccount (){
        navigation.navigate("signUp");
    }

    async function handleSignIn({email, password}:FormData){
        try{
            setIsLoading(true)
            await signIn(email, password);
            
        }catch(error){
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : " Não foi possível entrar. Tente entrar novamente mais tarde."
            setIsLoading(false)
            toast.show({
                title,
                placement:"top",
                bgColor:"red.500"
            })
        }
       
    }


    return(
        <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
        <VStack flex={1} px={10} >
            <Image
            source={BackgroundImg}
            defaultSource={BackgroundImg}
            alt='Pessoas treinando '
            resizeMode="contain"
            position="absolute"
            />
        <Center my={24}>
            <LogoSvg/>

            <Text color="gray.100" fontSize="sm">
                Treine sua mente e o corpo
            </Text>
        </Center>
        <Center>
           <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
           </Heading>

           <Controller
            control={control}
            name="email"
            
            render={({field:{onChange, value}})=>(
                <Input
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
                 />
            )}
        />
        

        <Controller
            control={control}
            name="password"
            render={({field:{onChange, value}})=>(
                <Input 
                placeholder='Senha'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}

                 />
            )}
        /> 

           <Button
           title='Acessar'
           onPress={handleSubmit(handleSignIn)}
           isLoading={isLoading}
           />

           
        </Center>
        
        <Center mt={24}>
        <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
        </Text>
        </Center>
           <Button
           title='Criar conta'
           variant="outline"
           onPress={handleNewAccount}
           />
        </VStack>
        </ScrollView>
    );
} 


