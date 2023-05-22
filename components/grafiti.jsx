import { useSignMessage } from "wagmi";

export default function Grafiti({}) {
  const { signMessage } = useSignMessage();

  const handleClick = () => {
    signMessage({
      message: "gm wagmi frens",
      onSuccess(data) {
        console.log("Success", data);
      },
      onError(error) {
        console.log("Error", error);
      },
    });
  };

  // returning componeneting showcasing a button to sign the message
  return (
    <div>
      <button onClick={handleClick}>Sign Message</button>
    </div>
  );
}
