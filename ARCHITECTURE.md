# Arquitetura do Projeto

Este projeto segue os princípios de **MVVM (Model-View-ViewModel)** e **Atomic Design** para manter o código organizado, escalável e fácil de manter.

## 📁 Estrutura de Pastas

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── atoms/             # Componentes básicos reutilizáveis
│   │   ├── Button.tsx
│   │   ├── TextArea.tsx
│   │   ├── CodeBlock.tsx
│   │   └── InfoBox.tsx
│   ├── molecules/         # Composições simples de átomos
│   │   ├── TabButton.tsx
│   │   └── MapControls.tsx
│   └── organisms/         # Componentes complexos
│       ├── InteractiveMap.tsx
│       ├── MapView.tsx
│       └── PolylineDecoder.tsx
├── hooks/                 # Custom Hooks (ViewModels)
│   ├── usePolylineDecoder.ts
│   ├── usePolylineEncoder.ts
│   ├── useInteractiveMap.ts
│   └── useClipboard.ts
├── types/                 # Definições de tipos TypeScript
│   └── index.ts
├── constants/             # Constantes da aplicação
│   └── index.ts
└── utils/                 # Funções utilitárias
    └── polyline.ts
```

## 🏗️ Atomic Design

### Atoms (Átomos)
Componentes básicos e indivisíveis que não podem ser decompostos:
- **Button**: Botão reutilizável com variantes (primary, secondary, danger, success, purple)
- **TextArea**: Campo de texto com label e mensagem de erro
- **CodeBlock**: Bloco de código com opção de copiar
- **InfoBox**: Caixa de informação com variantes (info, success, warning, error)

### Molecules (Moléculas)
Combinações simples de átomos que formam funcionalidades específicas:
- **TabButton**: Botão de navegação entre abas
- **MapControls**: Controles do mapa (fechar polígono, limpar)

### Organisms (Organismos)
Componentes complexos que formam seções completas:
- **InteractiveMap**: Mapa interativo com Leaflet
- **MapView**: Visualizador de mapa read-only
- **PolylineDecoder**: Componente principal da aplicação

## 🔄 MVVM Pattern

### Model
- `utils/polyline.ts`: Lógica de codificação/decodificação de polylines
- `types/index.ts`: Definições de tipos de dados

### View
- Componentes em `components/`: Apresentação visual pura
- Recebem dados e callbacks via props
- Não contêm lógica de negócio

### ViewModel
- Custom Hooks em `hooks/`: Gerenciam estado e lógica de negócio
- **usePolylineDecoder**: Lógica para decodificar polylines
- **usePolylineEncoder**: Lógica para codificar arrays em polylines
- **useInteractiveMap**: Gerenciamento de pontos no mapa interativo
- **useClipboard**: Utilitário para copiar para área de transferência

## 🎯 Benefícios da Arquitetura

### 1. **Separação de Responsabilidades**
- Componentes focam apenas em UI
- Hooks gerenciam estado e lógica
- Utils contêm funções puras

### 2. **Reusabilidade**
- Componentes atômicos podem ser usados em qualquer lugar
- Hooks podem ser compartilhados entre componentes

### 3. **Testabilidade**
- Componentes são fáceis de testar isoladamente
- Hooks podem ser testados independentemente da UI

### 4. **Escalabilidade**
- Fácil adicionar novos componentes
- Simples estender funcionalidades

### 5. **Manutenibilidade**
- Código organizado e previsível
- Fácil encontrar e modificar componentes

## 📝 Convenções de Código

### Nomenclatura
- **Componentes**: PascalCase (ex: `Button.tsx`)
- **Hooks**: camelCase com prefixo `use` (ex: `usePolylineDecoder.ts`)
- **Tipos**: PascalCase (ex: `Point`, `MapViewState`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `MAP_CONFIG`)

### Organização de Imports
1. Bibliotecas externas
2. Tipos e interfaces
3. Hooks customizados
4. Componentes
5. Utilitários e constantes

### Tipagem
- Sempre usar TypeScript
- Exportar tipos reutilizáveis de `types/index.ts`
- Evitar `any`, preferir tipos específicos

## 🔧 Como Adicionar Novos Recursos

### Novo Componente Atômico
1. Criar em `components/atoms/`
2. Definir props com TypeScript
3. Manter componente puro (sem estado)

### Novo Hook
1. Criar em `hooks/`
2. Nome começar com `use`
3. Retornar estado e métodos necessários

### Nova Funcionalidade
1. Criar hook para lógica (ViewModel)
2. Criar componentes necessários (View)
3. Conectar no componente pai

## 🌟 Exemplo de Fluxo de Dados

```
User Interaction
       ↓
View (Component)
       ↓
ViewModel (Hook)
       ↓
Model (Utils)
       ↓
ViewModel (Hook)
       ↓
View (Component)
       ↓
UI Update
```

Este padrão garante que os dados fluam de maneira unidirecional e previsível através da aplicação.
