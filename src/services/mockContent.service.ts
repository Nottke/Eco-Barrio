/** Datos locales de ejemplo (solo frontend). Sustituir por API cuando exista backend. */

export type EcoNewsArticle = {
  id: string;
  title: string;
  summary: string;
  date: string;
};

export type EcoEvent = {
  id: string;
  title: string;
  date: string;
  place: string;
  spotsHint: string;
};

export type RecyclingPoint = {
  id: string;
  name: string;
  address: string;
  schedule: string;
  accepts: string;
};

export type EnvIndicator = {
  id: string;
  label: string;
  value: string;
  unit?: string;
  note: string;
};

export function listEcoNews(): EcoNewsArticle[] {
  return [
    {
      id: 'n1',
      title: 'Campaña de limpieza comunal sector rural',
      summary:
        'Participación ciudadana todos los sábados de mayo. Punto de encuentro Plaza Central.',
      date: '2026-05-02',
    },
    {
      id: 'n2',
      title: 'Taller: separación en origen para familias',
      summary:
        'Educación práctica sobre reciclaje y reducción de residuos. Cupos limitados.',
      date: '2026-05-06',
    },
    {
      id: 'n3',
      title: 'Puntos limpios móviles en la comuna',
      summary:
        'Cronograma de recorridos en sectores de difícil conectividad. Consulta desde Eco-Barrio.',
      date: '2026-05-08',
    },
  ];
}

export function listEcoEvents(): EcoEvent[] {
  return [
    {
      id: 'e1',
      title: 'Feria del reciclaje y trueque',
      date: '2026-05-15',
      place: 'Gimnasio municipal',
      spotsHint: 'Inscripción abierta hasta completar cupo.',
    },
    {
      id: 'e2',
      title: 'Reforestación comunitaria Cerro Esperanza',
      date: '2026-05-18',
      place: 'Entrada norte del cerro',
      spotsHint: 'Lleva guantes y botella reutilizable.',
    },
    {
      id: 'e3',
      title: 'Charla: agua y medición en el hogar',
      date: '2026-05-22',
      place: 'Sala cultural',
      spotsHint: 'Actividad gratuita, prioriza adultos titulares del hogar.',
    },
  ];
}

export function listRecyclingPoints(): RecyclingPoint[] {
  return [
    {
      id: 'r1',
      name: 'Punto limpio centro',
      address: 'Frente a la municipalidad (acceso lateral)',
      schedule: 'Lun–Sáb 09:00–18:00',
      accepts: 'Plásticos, cartón y metal en buen estado',
    },
    {
      id: 'r2',
      name: 'Isla rural San José',
      address: 'Cruce ruta provincial Km 12',
      schedule: 'Mar y Vie 10:00–14:00',
      accepts: 'Envases, pilas descargadas, aceite usado en envase cerrado',
    },
    {
      id: 'r3',
      name: 'Eco-box barrio norte',
      address: 'Plaza menor, módulo blanco rotulado Eco-Barrio',
      schedule: 'Todo el día — vaciado semanal viernes',
      accepts: 'Papel y tetrapack sin restos orgánicos',
    },
  ];
}

export function listEnvIndicators(): EnvIndicator[] {
  return [
    {
      id: 'i1',
      label: 'Toneladas recolectadas último mes',
      value: '42',
      unit: 'tn',
      note: 'Valor ilustrativo; se conectará a datos reales con backend.',
    },
    {
      id: 'i2',
      label: 'Participación en campañas',
      value: '128',
      unit: 'familias',
      note: 'Inscripciones vía aplicación piloto Eco-Barrio.',
    },
    {
      id: 'i3',
      label: 'Recorridos de educación ambiental',
      value: '6',
      unit: 'talleres',
      note: 'Incluye sectores rurales de la comuna.',
    },
  ];
}
