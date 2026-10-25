import { generalEnquiry, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

/** Always one tap away, as the brand book asks. */
export function WhatsAppFloat() {
  return (
    <a className="wa-float" href={waLink(generalEnquiry())} target="_blank" rel="noopener noreferrer" aria-label="Chat with Neelam ji on WhatsApp">
      <WhatsAppIcon size={28} />
    </a>
  );
}
