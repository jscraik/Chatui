import { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DatePicker,
  DateRangePicker,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Progress,
  SegmentedControl,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui";
import { CodeBlock } from "../../design-system/showcase/docs/CodeBlock";

export function NewComponentsShowcase() {
  const [view, setView] = useState<"grid" | "list" | "compact">("grid");
  const [date, setDate] = useState<Date>();
  const [rangeStart, setRangeStart] = useState<Date>();
  const [rangeEnd, setRangeEnd] = useState<Date>();
  const [framework, setFramework] = useState("react");

  const codeExample = `function HelloWorld() {
  return <div>Hello, world!</div>;
}`;

  return (
    <div className="h-full overflow-auto bg-foundation-bg-dark-1">
      <div className="max-w-6xl mx-auto p-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-foundation-text-dark-primary">
            New Components Showcase
          </h1>
          <p className="text-foundation-text-dark-secondary">
            Curated set of core building blocks for modern UI construction
          </p>
        </div>

        {/* Alerts */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-foundation-text-dark-primary mb-2">
              Alerts & Messaging
            </h2>
            <p className="text-foundation-text-dark-tertiary">
              Consistent, accessible messaging for key states
            </p>
          </div>
          <div className="grid gap-3">
            <Alert>
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>
                This is an informational alert with supporting text.
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your changes were saved successfully.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Review your settings before continuing.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* CodeBlock */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-foundation-text-dark-primary mb-2">
              Code Blocks
            </h2>
            <p className="text-foundation-text-dark-tertiary">
              Copy-friendly code snippets for documentation and examples
            </p>
          </div>
          <CodeBlock code={codeExample} language="tsx" />
        </section>

        {/* Loading */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-foundation-text-dark-primary mb-2">
              Loading & Progress
            </h2>
            <p className="text-foundation-text-dark-tertiary">
              Skeletons and progress indicators for async surfaces
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Skeleton States</CardTitle>
                <CardDescription>Represent loading content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
                <CardDescription>Indicate task completion</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={45} />
                <Progress value={72} />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Segmented Control */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-foundation-text-dark-primary mb-2">
              Segmented Control
            </h2>
            <p className="text-foundation-text-dark-tertiary">
              Mutually exclusive options for quick view switching
            </p>
          </div>
          <SegmentedControl
            value={view}
            onChange={setView}
            options={[
              { value: "grid", label: "Grid" },
              { value: "list", label: "List" },
              { value: "compact", label: "Compact" },
            ]}
          />
        </section>

        {/* Forms */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-foundation-text-dark-primary mb-2">
              Forms & Inputs
            </h2>
            <p className="text-foundation-text-dark-tertiary">
              Structured inputs with consistent styling and behavior
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Text Input</CardTitle>
                <CardDescription>Standard text fields</CardDescription>
              </CardHeader>
              <CardContent>
                <Input placeholder="Type here..." />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Select</CardTitle>
                <CardDescription>Choose a framework</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={framework} onValueChange={setFramework}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="vue">Vue</SelectItem>
                    <SelectItem value="svelte">Svelte</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Date Picker</CardTitle>
                <CardDescription>Select a single date</CardDescription>
              </CardHeader>
              <CardContent>
                <DatePicker value={date} onValueChange={setDate} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Date Range</CardTitle>
                <CardDescription>Select a range</CardDescription>
              </CardHeader>
              <CardContent>
                <DateRangePicker
                  startDate={rangeStart}
                  endDate={rangeEnd}
                  onRangeChange={(start: Date | undefined, end: Date | undefined) => {
                    setRangeStart(start);
                    setRangeEnd(end);
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Dropdown Menu */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-foundation-text-dark-primary mb-2">
              Menus
            </h2>
            <p className="text-foundation-text-dark-tertiary">
              Contextual menus for compact actions
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        {/* Tabs */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-foundation-text-dark-primary mb-2">
              Tabs
            </h2>
            <p className="text-foundation-text-dark-tertiary">
              Organize dense content into clear sections
            </p>
          </div>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card>
                <CardContent className="pt-6 text-foundation-text-dark-secondary">
                  Overview content goes here.
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="details">
              <Card>
                <CardContent className="pt-6 text-foundation-text-dark-secondary">
                  Detailed settings and configuration.
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="activity">
              <Card>
                <CardContent className="pt-6 text-foundation-text-dark-secondary">
                  Recent activity and updates.
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Ready to build?</CardTitle>
              <CardDescription>
                Combine these primitives to craft cohesive, accessible experiences.
              </CardDescription>
            </CardHeader>
            <CardFooter className="gap-3">
              <Button variant="default">Start a project</Button>
              <Button variant="outline">View docs</Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </div>
  );
}
