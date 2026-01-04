import { useSyncExternalStore } from "react";

import { SET_GLOBALS_EVENT_TYPE, type OpenAiGlobals, type SetGlobalsEvent } from "./types";

declare global {
  interface Window {
    openai?: OpenAiGlobals;
  }
}

export function useOpenAiGlobal<K extends keyof OpenAiGlobals>(
  key: K,
): Exclude<OpenAiGlobals[K], undefined> | null {
  type GlobalValue = Exclude<OpenAiGlobals[K], undefined> | null;

  const normalizeValue = (value: OpenAiGlobals[K] | undefined): GlobalValue =>
    value === undefined ? null : (value as Exclude<OpenAiGlobals[K], undefined>);

  const getSnapshot = (): GlobalValue => normalizeValue(window.openai?.[key]);

  return useSyncExternalStore<GlobalValue>(
    (onChange) => {
      if (typeof window === "undefined") {
        return () => {};
      }

      const handleSetGlobal = (event: Event) => {
        if (!(event instanceof CustomEvent)) {
          return;
        }

        const detail = event.detail as SetGlobalsEvent["detail"] | undefined;
        if (!detail) {
          return;
        }

        const value = detail.globals[key];
        if (value === undefined) {
          return;
        }

        onChange();
      };

      window.addEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal, {
        passive: true,
      });

      return () => {
        window.removeEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal);
      };
    },
    getSnapshot,
    getSnapshot,
  );
}
