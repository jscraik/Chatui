import { ComposeView } from "../../app/chat/ComposeView";
import { sampleComposeModes, sampleModels } from "../../fixtures/sample-data";
import type { ComposeModeConfig } from "../../app/chat/ComposeView";
import type { ModelConfig } from "../../components/ui/navigation/model-selector";

interface ComposeTemplateProps {
  models?: ModelConfig[];
  modes?: ComposeModeConfig[];
}

export function ComposeTemplate({ models, modes }: ComposeTemplateProps) {
  return <ComposeView models={models ?? sampleModels} modes={modes ?? sampleComposeModes} />;
}
