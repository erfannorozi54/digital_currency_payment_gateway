export function IRR2IRT(IRR) {
  let output = IRR.replace(/ریال/g, "تومان");

  const len = output.length;
  output = output.split("").map((char, index) => {
    if (index === len - 1 || index === len - 2 || index === len - 3) {
      return "۰";
    }
    return char;
  });
  const numberLen = len - 7;
  const numberOfComma = Math.floor(numberLen / 4);
  let temp;
  output[len - 1] = " ";

  for (let i = 0; i < numberOfComma; i++) {
    temp = output[len - (4 * i + 5)];
    output[len - (4 * i + 5)] = output[len - 4 * (i + 1)];
    output[len - 4 * (i + 1)] = temp;
  }

  if (numberOfComma * 4 == numberLen - 1) {
    output[7] = "  ";
  }

  output = output.join("");

  return output;
}
import { z } from "zod";

export const formSchema = z.object({
  walletAddress: z
    .string()
    .min(1, "آدرس کیف پول گیرنده را وارد کنید")
    .regex(/^0x[a-zA-Z0-9]{40}$/, "آدرس کیف پول نامعتبر است"),
  amount: z.number().min(1, "مقدار باید بیشتر از 0 باشد"),
});
