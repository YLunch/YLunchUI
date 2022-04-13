import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import ProgressButton, {ProgressButtonStatus} from "../../../common/components/ProgressButton";
import {ApiError} from "../../../common/models/Common";
import {CustomerCreateDto} from "../../../CustomerApp/models/Customer";
import {addCustomerApi} from "../../../CustomerApp/services/api/customers";
import {
    progressButtonErrorRecoveryTimeout,
    progressButtonSuccessRecoveryTimeout
} from "../../../common/constants/timeouts";
import FormInput from "../../../common/components/FormInput";
import {
    firstOrLastNameRegExp,
    passwordRegExp,
    phoneNumberRegExp,
    ynovEmailRegExp
} from "../../../common/constants/regexps";
import {translateApiErrors} from "../../../common/services/api/translation";
import useCurrentUser from "../../../common/hooks/useCurrentUser";
import {LoginRequestDto} from "../../../common/models/Authentication";
import {getCurrentUserApi, loginApi} from "../../../common/services/api/authentication";


interface Inputs extends FieldValues {

    name: String;
    description: String;
    price: string;
    quantity: string;
    isActive:true; 
    productType: string;
    expirationDateTime: Date;
    image: string;
    allergens:string;
    productTags:string;
}

export default function CreateProductForm() {
    const navigate = useNavigate();
    const [status, setStatus] = React.useState<ProgressButtonStatus>("idling");
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<Inputs>({ mode: "onBlur" });
    const { setCurrentUser } = useCurrentUser();

    const mutation = useMutation((data: LoginRequestDto) => loginApi(data), {
        onSuccess: async () => {
            setCurrentUser(await getCurrentUserApi());
            setStatus("success");
            setTimeout(async () => {
                setStatus("idling");
                navigate("/restaurants/restaurantId/products");
            }, progressButtonSuccessRecoveryTimeout);
        },
        onError: (_: ApiError) => {
            setCurrentUser(undefined);
            setStatus("error");
            setTimeout(() => {
                setStatus("idling");
            }, progressButtonErrorRecoveryTimeout);
        },
    });

    const submit = (data: LoginRequestDto) => {
        setStatus("loading");
        mutation.mutate(data);
    };

    return (
        <Box
            sx={{ display: "flex", flexDirection: "column", paddingY: 2 }}
            component={"form"}
            onSubmit={handleSubmit((data) => submit(data))}
        >
            <Typography
                variant="caption"
                sx={{ marginBottom: 2 }}
                textAlign={"right"}
            >
                Champ obligatoire*
            </Typography>
            <FormInput
                register={register}
                errors={errors}
                label="nom du produit *"
                name="name"
                rules={{
                    required: "Ce champs est requis",
                    pattern: {
                        value: ynovEmailRegExp,
                        message:
                            "Le nom ne doit pas être null",
                    },
                }}
            />
            <FormInput
                register={register}
                errors={errors}
                label="description du produit *"
                name="description"
                rules={{
                    required: "Ce champs est requis",
                    pattern: {
                        value: ynovEmailRegExp,
                        message:
                            "la description est obligatoire",
                    },
                }}
            />
            <FormInput
                register={register}
                errors={errors}
                label="prix du produit *"
                name="price"
                rules={{
                    required: "Ce champs est requis",
                    pattern: {
                        value: ynovEmailRegExp,
                        message:
                            "Le prix ne doit pas être null",
                    },
                }}
            />
            <FormInput
                register={register}
                errors={errors}
                label="prix du produit *"
                name="price"
                rules={{
                    required: "Ce champs est requis",
                    pattern: {
                        value: ynovEmailRegExp,
                        message:
                            "Le prix ne doit pas être null",
                    },
                }}
            />
            <FormInput
                register={register}
                errors={errors}
                label="la quantité du produit *"
                name="quantity"
                rules={{
                    required: "Ce champs est requis",
                    pattern: {
                        value: ynovEmailRegExp,
                        message:
                            "La quantité ne doit pas être null",
                    },
                }}
            />
            <FormInput
                register={register}
                errors={errors}
                label="Le type du produit*"
                name="productType"
                rules={{
                    required: "Ce champs est requis",
                    pattern: {
                        value: ynovEmailRegExp,
                        message:
                            "Indiquer le type du produit",
                    },
                }}
            />
            <FormInput
                register={register}
                errors={errors}
                label="la date du produit *"
                name="expirationDateTime"
                rules={{
                    required: "Ce champs est requis",
                    pattern: {
                        value: ynovEmailRegExp,
                        message:
                            "Indiquer la date du produit",
                    },
                }}
            />
            
            <FormInput
                register={register}
                errors={errors}
                label="Selectionner une image*"
                name="image"
                type="file"
                rules={{
                    required: "Ce champs est requis",
                }}
            />
            <FormInput
                register={register}
                errors={errors}
                label="la date du produit *"
                name="allergens"
                rules={{
                    required: "Ce champs est requis",
                    pattern: {
                        value: ynovEmailRegExp,
                        message:
                            "Indiquer si c'est allergens",
                    },
                }}
            />
            <FormInput
                register={register}
                errors={errors}
                label="productTags *"
                name="productTags"
                rules={{
                    required: "Ce champs est requis",
                    pattern: {
                        value: ynovEmailRegExp,
                        message:
                            "Indiquer le tag du produit",
                    },
                }}
            />
            <ProgressButton type="submit" label="Envoyer" status={status} />
        </Box>
    );
}