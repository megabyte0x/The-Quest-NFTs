import { useSignMessage } from "wagmi";

export default function Grafiti({}) {
  const { data, error, loading, signMessage } = useSignMessage({
    message: "gm wagmi frens",
    onSuccess: (data) => {
      console.log(data);
    },
  });

  // returning componeneting showcasing a button to sign the message
  return (
    <div>
      <button onClick={() => signMessage()}>Sign Message</button>
    </div>
  );
}
