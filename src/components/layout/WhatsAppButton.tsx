import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {

  const message = "Hello ACCTA Sri Lanka, I would like to get more information.";

  const whatsappLink = 'https://whatsapp.com/channel/0029Vb95xugDZ4LRvvD0nS2f';

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ACCTA Sri Lanka on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#20BA5A]"
    >
      <FaWhatsapp className="h-9 w-9" />

      {/* Tooltip */}
      <span className="absolute right-[72px] whitespace-nowrap rounded-md bg-[#15203a] px-3 py-2 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  );
}