type Props = {
    message: string | null | undefined
}

export function AuthFormErrorAlert({
    message
}: Props){
    <p className="text-descructive text-sm" role="alert">
        {message}
    </p>
}