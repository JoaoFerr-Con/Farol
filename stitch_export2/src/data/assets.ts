import { ImageAssetInfo, CheckinQuestion } from '../types';

export const APP_IMAGES: ImageAssetInfo[] = [
  {
    id: 'tree-illustration',
    name: 'Árvore do Jardim de Autocuidado',
    category: 'Gamificação / Dashboard',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmbij1cHidNXy_KQtTRJRFIJ3uabV8l4axTjcZawRRuGp_kPImLy8-75xx75-RVw-RPZD3abcIaMc_wZLOr1e1H4_0UlyxxOLsL6hM_THPiLfj8LOtJMnWTc252pzxCORcwABgYOfHt-bAbsbggeTCuUQBHrFNl9RAM_6Z4ZNV0nOBjUJFLiORvy8GlK1FLToA4fP_W9kPsYyh1KksR1ZDuFLaVctdx3ClKZhgIEOeso8hFQVQMko_8Q',
    alt: 'Ilustração vetorial minimalista de uma árvore verdejante para o Jardim de Autocuidado',
    previewDescription: 'Ilustração central do painel principal (Árvore de gamificação e saúde mental).'
  },
  {
    id: 'dr-ana-silva',
    name: 'Dra. Ana Silva (Psicóloga Clínica)',
    category: 'Profissionais / Agendamento',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvMOVaG5zmlhOpaPvS9yQ6PWiAeyQW5MrP65k9T9ksarTg1rOW6q0oI3Jr0ObuuTZCRlugpXTL6fHdD_-fokp2i3k0BtXJFtc_1uNlUxlpR96NnBFjFwEOB5V9VYLsLiRugREmQ4jPEyV9W26_wkG4ifTJ3NX_I6gpE3ijWvq4-o5GLXuZYEyoQy9quod0S73RK7X7FBWjM9HFgC-BVCBRG0O5XQLbE2gJbCsc8PSvmy0YtgK797K61A',
    alt: 'Foto de perfil profissional da Dra. Ana Silva, psicóloga clínica CRP 00/00000',
    previewDescription: 'Foto de perfil na tela de agendamento de psicoterapia breve.'
  },
  {
    id: 'user-joao-avatar',
    name: 'Avatar do Colaborador (João)',
    category: 'Usuário / Cabeçalho',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQCf0d5dyv49oD6HvLOsvNTxlwHyL5vebxMQ5C_QWipyIPUaEE6KH6ce6GKQMv272dF76KnibY_5e3gtDumTXs8OebOZeMNA3jQz4L0qwP4-Z_moKdkg3pPZ6Ea_NdjTIJRy7XQcJVMQ3FiSX3G6rqVWPIC_JbNO5PpdoJQJ-DUOVbFRVrga9syHPIx6MetSc7JhGyDG6Adt7m0RFPqhfc7xZpMSTa5qQqyJ1IGbu_403qTsYfHVf6Tg',
    alt: 'Foto de perfil de jovem colaborador com óculos',
    previewDescription: 'Foto de perfil no cabeçalho do painel do colaborador.'
  },
  {
    id: 'manager-avatar',
    name: 'Avatar do Gestor / RH',
    category: 'Usuário / Gestão',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0Kql5o1-deREIj9at3_hnpL1wX3FzJTXZgu1j2qOaMmEqu2BJ5uLmSptA9ki0V29pDNBPgpmOzy9-z0flfUM0Ev-pur1UdMxqOGLCsNAFevtX1iNYfBA7o0sZ4EOvIzuthXqHIG1mmL7ZqD58bDcypBiPxk9GMGp15CYX1Neyos27DWc8jVyAGVw-3ROoizyeW1j2RG8fFT6aHwuT6Ci7GKa-kKn95YfqDHdTeCQB7sLr296Bzp53ZQ',
    alt: 'Foto de perfil de gestor de operações',
    previewDescription: 'Foto de perfil na barra superior de gestão/desktop.'
  },
  {
    id: 'brand-logo-icon',
    name: 'Ícone Farol / Anjo da Guarda',
    category: 'Marca / Identidade',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuF9zIu2nOuzTgqcgVuaXa7Z-k3Q0PSb1CFKy8GXXlZvWxhzf0bcK7M-Qi9ldpQUj81J3eQosOIFocckZ8GPpCGpw4itWoJry2s1YjMoMMdej48BJqmky5kPn1sWo_OdU0HJYTJnH8HgtQN3WAI8OP5GWhrh-WPEW67tAPbC1Xs8ZsFxK9PjpCSSWt90WyP59kYOZP7y32a2Dpqjmgiwobs86EjnSkHuK5XRS8K20F4AKa_oxVpldjzQ',
    alt: 'Ícone minimalista da marca Anjo da Guarda / Farol',
    previewDescription: 'Símbolo de proteção e farol utilizado no side menu e branding.'
  },
  {
    id: 'zen-stones-succulent',
    name: 'Pedras Zen e Suculenta (Meditação)',
    category: 'Autocuidado / Meditação',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOTofnDg3JsEjFw5k2ES9q-7YxlYsoKl_vcB1fPphUQcnb0XhI1Lfd6_UBDsG9QSBtyd-zAEZOgJ1uDh13Ooit54dmJDoAAiRvZIp4sRXQtID68wPTqvzMF72_mDwCaTgnU_xv8MBHNz4NcA1DOG7I7B_8ymLziVwcNGJXAiXVvd90gIx9yZCFUo9bekJKFQ_1avz8JLbBe-yugpJXfFi_8PX7G4bDnKTW-OLKU7FG4Ie47wzsQQn-tg',
    alt: 'Pedras de meditação e planta suculenta em ambiente sereno',
    previewDescription: 'Card da atividade de meditação com recompensa de gotas.'
  },
  {
    id: 'psychotherapy-watercolor',
    name: 'Aquarela Abstrata Lilás e Menta',
    category: 'Autocuidado / Capas',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRmG8ftUa9gEblR49oVRmdJiN7_NDXcL9uONJt8lbHyah3tFp-Wc5tP1yllov2mq0ERf3gFJhjeb5uR8CGh5Hz50Rg1JVnb-PnKXeAFX6Hy7qAtPBVRSCp29KdRqEuUyfyJbrUGMz1l2OTCmugctItRzAdoZfw3jayOdhpfnHoPfBlhe4-wpH_qxD9JztBcJ-VRidX6J-v7cWQkbrB8qG_BfhHE3sJny7EVIyZm-_We6YqNo7gOeMiJw',
    alt: 'Textura suave em aquarela tons lilás e verde menta',
    previewDescription: 'Capa do módulo de psicoterapia breve no catálogo de autocuidado.'
  },
  {
    id: 'reading-notebook-desk',
    name: 'Caderno de Anotações e Planta',
    category: 'Autocuidado / Capas',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0LsZItzfYyejR7bCTyqSkvPzDD0YSOXsJge9iIWo9NX7tl4dxdCTnLMWkMfzarXFil74ChKNu5TyzLyJR6KuCJVN7C_YxV6dAVI3CyJ9iICCceiMs6eRFGoJo9mvSKMKjuLXIS5jO9jCKFNYNTvPMf4JRsFu8wYdLiDEdqs8FdmogCrnw504NrIKHF2colHpg28EJGn1HLmKvj89jxmiSesO2ipuJPpmJsNFJgkckIsrEeYLWkfhm5Q',
    alt: 'Caderno aberto em mesa de trabalho com planta e xícara de café',
    previewDescription: 'Capa da seção de leitura, reflexões e vídeos de bem-estar.'
  },
  {
    id: 'zen-stones-plate',
    name: 'Pedras de Equilíbrio em Prato Zen',
    category: 'Autocuidado / Capas',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPRzFWRN8n2XaL9jsoE7CLPeWb6OF4TOqCnT6geGNfs7tVoB6ZTvfYXYP57P_ip_2ZE4yn7lTqZDhOmYdgsG5hcGZ00cFt_Ynqxeqx0ZpfdKHnF18xsN8W40msrn9AQtkChi94Y51Lg_VuHv_RkSEzPkS9d8V1YrDfKhiFWjiF067xpy9EtGSYKUXC1g7lOkeBO2p_OCkh4K1-jHCdBcSyq21haZH8k5EOrRWC1fNrusVUTqBwbEsFng',
    alt: 'Pedras empilhadas sobre prato de cerâmica e areia branca',
    previewDescription: 'Capa do módulo de mindfulness e respiração guiada.'
  }
];

export const CHECKIN_QUESTIONS: CheckinQuestion[] = [
  {
    id: 1,
    question: 'Como você avalia o seu nível geral de energia física e mental hoje?',
    subtitle: 'Considere a sua disposição para as tarefas do dia a dia.',
    options: [
      { label: 'Muito baixo', value: 1 },
      { label: 'Baixo', value: 2 },
      { label: 'Moderado', value: 3 },
      { label: 'Bom', value: 4 },
      { label: 'Excelente', value: 5 }
    ]
  },
  {
    id: 2,
    question: 'Na última semana, com que frequência você se sentiu sobrecarregado?',
    subtitle: 'Sua resposta é confidencial e nos ajuda a personalizar seu suporte.',
    options: [
      { label: 'Nunca', value: 1 },
      { label: 'Raramente', value: 2 },
      { label: 'Às vezes', value: 3 },
      { label: 'Frequente', value: 4 },
      { label: 'Sempre', value: 5 }
    ]
  },
  {
    id: 3,
    question: 'Você sente que tem clareza sobre suas prioridades e apoio para realizá-las?',
    subtitle: 'Considere o suporte de colegas e recursos disponíveis.',
    options: [
      { label: 'Totalmente claro e apoiado', value: 5 },
      { label: 'Na maior parte das vezes', value: 4 },
      { label: 'Razoavelmente', value: 3 },
      { label: 'Pouco apoio/clareza', value: 2 },
      { label: 'Nenhum suporte', value: 1 }
    ]
  },
  {
    id: 4,
    question: 'Como tem sido a qualidade do seu sono e descanso nos últimos dias?',
    subtitle: 'O descanso adequado é fundamental para o seu bem-estar psicossocial.',
    options: [
      { label: 'Muito ruim / Insônia', value: 1 },
      { label: 'Agitado / Insatisfatório', value: 2 },
      { label: 'Regular', value: 3 },
      { label: 'Bom e reparador', value: 4 },
      { label: 'Excelente', value: 5 }
    ]
  },
  {
    id: 5,
    question: 'Você tem conseguido pausas suficientes para respirar durante a jornada?',
    subtitle: 'Pequenos momentos de descompressão previnem o esgotamento.',
    options: [
      { label: 'Nunca consigo parar', value: 1 },
      { label: 'Raramente', value: 2 },
      { label: 'Às vezes', value: 3 },
      { label: 'Na maioria dos dias', value: 4 },
      { label: 'Sempre com pausas saudáveis', value: 5 }
    ]
  },
  {
    id: 6,
    question: 'Como você se sente em relação ao clima emocional e segurança no trabalho?',
    subtitle: 'Em conformidade com a NR-01 para prevenção de riscos psicossociais.',
    options: [
      { label: 'Muito tenso e inseguro', value: 1 },
      { label: 'Pouco seguro', value: 2 },
      { label: 'Neutro / Estável', value: 3 },
      { label: 'Seguro e respeitado', value: 4 },
      { label: 'Ambiente acolhedor e seguro', value: 5 }
    ]
  }
];
