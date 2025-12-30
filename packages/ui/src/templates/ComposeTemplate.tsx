import { ComposeView } from "../app/components/chat/ComposeView";
import { sampleComposeModes, sampleModels } from "../app/data/sample-data";
import type { ComposeModeConfig } from "../app/components/chat/ComposeView";
import type { ModelConfig } from "../app/components/ui/navigation/model-selector";

interface ComposeTemplateProps {
  models?: ModelConfig[];
  modes?: ComposeModeConfig[];
}

export function ComposeTemplate({ models, modes }: ComposeTemplateProps) {
  return <ComposeView models={models ?? sampleModels} modes={modes ?? sampleComposeModes} />;
}
