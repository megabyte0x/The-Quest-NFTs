import { useSignMessage } from "wagmi";

export default function Grafiti({}) {
  //! URGENT: Think of some cool messsage to sign.
  const { data, error, signMessage, isSuccess, isLoading, isError } =
    useSignMessage({
      message: "gm wagmi frens",
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  // TODO: 1. Customize the message, button, and the text that is displayed
  // TODO: 2. Clip the hash to 5 characters and Add a button to copy the hash to the clipboard
  return (
    <div>
      <button onClick={() => signMessage()}>Sign Message</button>
      <div>
        {" "}
        Your Hash{" "}
        {isSuccess ? (
          <div>{data}</div>
        ) : isLoading ? (
          <div> wait for it!!</div>
        ) : isError ? (
          <div>{error}</div>
        ) : (
          <div>You need to Sign the message first!</div>
        )}
      </div>
    </div>
  );
}
