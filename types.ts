export interface ContactForm {
    companyName: string;
    email: string;
    whatsapp: string;
    avgTicket: string;
    goal: 'sales' | 'stress' | 'both';
    teamDescription: string;
  }
  
  export interface NavLink {
    name: string;
    href: string;
  }
  
  export const PHASES = [
    {
      id: 1,
      title: "PROSPECTAR (BASE 100)",
      tech: "Biocoaching + n8n",
      desc: "Autoconocimiento para identificar leads ideales."
    },
    {
      id: 2,
      title: "CONTACTAR",
      tech: "Salesforce Einstein",
      desc: "Outreach empático automatizado."
    },
    {
      id: 3,
      title: "PRESENTAR",
      tech: "Storytelling Dinámico",
      desc: "Demos personalizadas en tiempo real."
    },
    {
      id: 4,
      title: "CERRAR",
      tech: "Predicción IA",
      desc: "Negociación emocional y cierre predictivo."
    }
  ];