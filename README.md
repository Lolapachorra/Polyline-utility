# 🗺️ Decodificador de Polyline

Uma aplicação moderna e eficiente para codificar e decodificar Google Polylines, desenvolvida com Next.js 15, React 19 e TypeScript.

## ✨ Funcionalidades

### 1. **String → Pontos**

- Decodifica strings polyline codificadas em coordenadas
- Visualização no mapa interativo
- Exportação em formato JSON e GeoJSON Points
- Função de inverter Lat/Lng
- Remove escapes de JSON automático

### 2. **Array → Polyline**

- Converte arrays de coordenadas em polylines codificadas
- Suporta múltiplos formatos de entrada:
  - `[[lat, lng], ...]`
  - `[{lat, lng}, ...]`
  - `[{latitude, longitude}, ...]`
  - GeoJSON coordinates
- Visualização no mapa
- Exportação em GeoJSON LineString

### 3. **Mapa Interativo**

- Adicione pontos clicando no mapa
- Marcadores numerados automáticos
- Visualização em tempo real da polyline
- Botão "Fechar Polígono" para criar áreas
- Popup com opção de excluir pontos individuais
- Mantém zoom e posição ao adicionar pontos
- Exportação automática em polyline e JSON

## 🏗️ Arquitetura

O projeto segue **MVVM (Model-View-ViewModel)** e **Atomic Design** para máxima organização e escalabilidade.

### Estrutura de Componentes

```
components/
├── atoms/        # Componentes básicos (Button, TextArea, CodeBlock, InfoBox)
├── molecules/    # Composições simples (TabButton, MapControls)
└── organisms/    # Componentes complexos (InteractiveMap, PolylineDecoder)
```

### Custom Hooks (ViewModels)

```
hooks/
├── usePolylineDecoder.ts   # Lógica de decodificação
├── usePolylineEncoder.ts   # Lógica de codificação
├── useInteractiveMap.ts    # Gerenciamento do mapa
└── useClipboard.ts         # Utilitário de clipboard
```

📚 **Veja [ARCHITECTURE.md](./ARCHITECTURE.md) para detalhes completos da arquitetura**

## 🚀 Tecnologias

- **Next.js 15.5.4** - Framework React com App Router
- **React 19.1.0** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **Turbopack** - Build tool ultra-rápido
- **Leaflet** - Mapas interativos
- **Google Polyline Algorithm** - Codificação/decodificação

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Variantes de Botão

- `primary` - Ações principais (azul)
- `secondary` - Ações secundárias (cinza)
- `danger` - Ações destrutivas (vermelho)
- `success` - Ações de confirmação (verde)
- `purple` - Ações especiais (roxo)

### Variantes de InfoBox

- `info` - Informações gerais (azul)
- `success` - Mensagens de sucesso (verde)
- `warning` - Avisos (amarelo)
- `error` - Erros (vermelho)

## 🔧 Como Usar

### Decodificar Polyline

1. Vá para a aba "String → Pontos"
2. Cole a string polyline codificada
3. Clique em "Decodificar"
4. Visualize os pontos no mapa e copie o resultado

### Codificar Array

1. Vá para a aba "Array → Polyline"
2. Cole o array de coordenadas em formato JSON
3. Clique em "Codificar"
4. Copie a polyline gerada

### Criar Polyline Interativamente

1. Vá para a aba "Mapa Interativo"
2. Clique no mapa para adicionar pontos
3. Use "Fechar Polígono" para conectar o último ponto ao primeiro
4. Copie a polyline ou coordenadas geradas

## 🎯 Benefícios da Arquitetura

- ✅ **Código Organizado**: Fácil de navegar e entender
- ✅ **Reutilizável**: Componentes podem ser usados em outros projetos
- ✅ **Testável**: Hooks e componentes isolados
- ✅ **Escalável**: Simples adicionar novos recursos
- ✅ **Tipado**: TypeScript garante segurança de tipos
- ✅ **Performático**: Turbopack e React 19

## 📝 Estrutura de Pastas

```
auxiliador-polyline/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Componentes (Atomic Design)
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── hooks/            # Custom Hooks (ViewModels)
│   ├── types/            # TypeScript Types
│   ├── constants/        # Constantes da aplicação
│   └── utils/            # Funções utilitárias
├── public/               # Assets estáticos
├── ARCHITECTURE.md       # Documentação da arquitetura
├── CLAUDE.md            # Instruções para Claude Code
└── README.md            # Este arquivo
```

## 🤝 Contribuindo

1. Leia [ARCHITECTURE.md](./ARCHITECTURE.md) para entender a estrutura
2. Siga as convenções de código estabelecidas
3. Mantenha os componentes atômicos puros (sem estado)
4. Use hooks para lógica de negócio
5. Documente novos recursos

## 📄 Licença

MIT

---

**Desenvolvido com o intuito de ser mais fácil de usar que o Google Polyline Encoder** 🚀
