import { useEffect, useRef, useState } from "react";

const sleep = (time: number) =>
  new Promise((res) => setTimeout(() => res(""), time));

const TypingHeading = ({
  headings,
  className,
}: {
  headings: string[];
  className?: string;
}) => {
  const [heading, setHeading] = useState("");
  const [isBlink, setIsBlink] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const typingHeading = async (i: number): Promise<void> => {
    const heading = headings[i];
    for (let i = 0; i < heading.length; i++) {
      setHeading((currHeading) => currHeading + heading.at(i));
      await sleep(Math.random() * 500);
    }
  };

  useEffect(() => {
    (async () => {
      let teste = 0;
      while (true) {
        await typingHeading(teste);
        teste = teste + 1 > headings.length - 1 ? 0 : teste + 1;
        await sleep(3000);
        setHeading("");
      }
    })();
    setInterval(() => {
      setIsBlink((currIsBlink) => !currIsBlink);
    }, 400);
  }, []);

  return (
    <p ref={ref} className={className}>
        {heading}
        {isBlink && <span>|</span>}
    </p>
  );
};

export default TypingHeading;
