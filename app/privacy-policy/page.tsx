import LegalPage from "@/components/LegalPage";
import { PRIVACY } from "@/lib/legal";

export const metadata = { title: PRIVACY.title };

export default function Page() {
  return <LegalPage doc={PRIVACY} />;
}
