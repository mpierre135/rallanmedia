import LegalPage from "@/components/LegalPage";
import { TERMS } from "@/lib/legal";

export const metadata = { title: TERMS.title };

export default function Page() {
  return <LegalPage doc={TERMS} />;
}
