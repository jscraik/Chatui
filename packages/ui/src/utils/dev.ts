/**
 * Development utilities for debugging and testing components
 */

/**
 * Log component props in development mode
 */
export function logProps<T extends Record<string, unknown>>(componentName: string, props: T): T {
  if (process.env.NODE_ENV === "development") {
    console.group(`🔍 ${componentName} Props`);
    console.table(props);
    console.groupEnd();
  }
  return props;
}

/**
 * Measure component render time
 */
export function measureRender<T extends (...args: unknown[]) => unknown>(
  componentName: string,
  renderFn: T,
): T {
  if (process.env.NODE_ENV === "development") {
    return ((...args: Parameters<T>) => {
      const start = performance.now();
      const result = renderFn(...args);
      const end = performance.now();
      console.log(`⏱️ ${componentName} rendered in ${(end - start).toFixed(2)}ms`);
      return result;
    }) as T;
  }
  return renderFn;
}

/**
 * Debug component lifecycle
 */
export function useDebugLifecycle(componentName: string, props?: unknown) {
  if (process.env.NODE_ENV === "development") {
    console.log(`🔄 ${componentName} mounted`, props);

    return () => {
      console.log(`🔄 ${componentName} unmounted`);
    };
  }
}

/**
 * Validate required props
 */
export function validateProps<T extends Record<string, unknown>>(
  componentName: string,
  props: T,
  required: (keyof T)[],
): void {
  if (process.env.NODE_ENV === "development") {
    const missing = required.filter((key) => props[key] === undefined);
    if (missing.length > 0) {
      console.error(`❌ ${componentName}: Missing required props: ${missing.join(", ")}`);
    }
  }
}
