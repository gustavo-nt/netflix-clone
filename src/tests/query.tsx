import { render, RenderOptions } from "@testing-library/react";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../services/queryClient";

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
    ...options,
  });

export { customRender as render };
