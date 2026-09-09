import spinnerImg from "../../assets/spinner.svg";

export function LoadingSpinner(){
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" role="status" aria-live="polite">
            <img src={spinnerImg} alt="" aria-hidden="true" className="size-16" />

            <span className="sr-only"> Carregando... </span>
        </div>
    )
}