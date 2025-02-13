import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  ListBulletIcon,
  ChatBubbleLeftRightIcon,
  QueueListIcon,
  DocumentTextIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Editor } from "@tiptap/react";

interface ToolbarProps {
  editor: Editor | null;
  onPreviewClick?: () => void;
}

const fontSizes = [
  "8px",
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "30px",
  "36px",
  "48px",
  "60px",
  "72px",
  "96px",
];

const colors = [
  "#000000",
  "#434343",
  "#666666",
  "#999999",
  "#b7b7b7",
  "#cccccc",
  "#d9d9d9",
  "#efefef",
  "#f3f3f3",
  "#ffffff",
  "#980000",
  "#ff0000",
  "#ff9900",
  "#ffff00",
  "#00ff00",
  "#00ffff",
  "#4a86e8",
  "#0000ff",
  "#9900ff",
  "#ff00ff",
];

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | 0;

const headingLevels: { label: string; level: HeadingLevel }[] = [
  { label: "Heading 1", level: 1 },
  { label: "Heading 2", level: 2 },
  { label: "Heading 3", level: 3 },
  { label: "Heading 4", level: 4 },
  { label: "Heading 5", level: 5 },
  { label: "Heading 6", level: 6 },
  { label: "Paragraph", level: 0 },
];

export default function Toolbar({ editor, onPreviewClick }: ToolbarProps) {
  return (
    <div className="px-4 py-3 rounded-t-lg flex flex-row justify-between items-center border border-gray-200 bg-gray-50">
      <div className="flex flex-row gap-1 justify-center items-center">
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="text-gray-700 hover:bg-gray-200 min-w-[120px] flex items-center gap-1 justify-start"
              size="sm"
              variant="light"
            >
              <Bars3Icon className="w-4 h-4" />
              <span className="text-xs">
                {editor?.isActive("paragraph")
                  ? "Paragraph"
                  : editor?.isActive("heading")
                    ? `Heading ${editor.getAttributes("heading").level}`
                    : "Paragraph"}
              </span>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Heading levels"
            onAction={(level) => {
              const numLevel = Number(level);

              if (numLevel === 0) {
                editor?.chain().focus().setParagraph().run();
              } else if (numLevel >= 1 && numLevel <= 6) {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: numLevel as 1 | 2 | 3 | 4 | 5 | 6 })
                  .run();
              }
            }}
          >
            {headingLevels.map((heading) => (
              <DropdownItem
                key={heading.level}
                className={`${
                  editor?.isActive("heading", { level: heading.level }) ||
                  (heading.level === 0 && editor?.isActive("paragraph"))
                    ? "bg-gray-100"
                    : ""
                }`}
              >
                {heading.level === 0 ? (
                  <span className="text-sm">Paragraph</span>
                ) : (
                  <span style={{ fontSize: `${20 - heading.level * 2}px` }}>
                    {heading.label}
                  </span>
                )}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <div className="w-px h-6 bg-gray-200 mx-1" />
        <Button
          isIconOnly
          className={`${editor?.isActive("bold") ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-200"}`}
          size="sm"
          variant="light"
          onPress={() => editor?.chain().focus().toggleBold().run()}
        >
          <BoldIcon className="w-4 h-4" />
        </Button>
        <Button
          isIconOnly
          className={`${editor?.isActive("italic") ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-200"}`}
          size="sm"
          variant="light"
          onPress={() => editor?.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon className="w-4 h-4" />
        </Button>
        <Button
          isIconOnly
          className={`${editor?.isActive("underline") ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-200"}`}
          size="sm"
          variant="light"
          onPress={() => editor?.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="w-4 h-4" />
        </Button>
        <Button
          isIconOnly
          className={`${editor?.isActive("strike") ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-200"}`}
          size="sm"
          variant="light"
          onPress={() => editor?.chain().focus().toggleStrike().run()}
        >
          <StrikethroughIcon className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-gray-200 mx-1" /> {/* Divider */}
        <Button
          isIconOnly
          className={`${editor?.isActive("bulletList") ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-200"}`}
          size="sm"
          variant="light"
          onPress={() => {
            editor?.chain().focus().toggleBulletList().run();
          }}
        >
          <ListBulletIcon className="w-4 h-4" />
        </Button>
        <Button
          isIconOnly
          className={`${editor?.isActive("orderedList") ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-200"}`}
          size="sm"
          variant="light"
          onPress={() => {
            editor?.chain().focus().toggleOrderedList().run();
          }}
        >
          <QueueListIcon className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-gray-200 mx-1" />
        <Button
          isIconOnly
          className={`${editor?.isActive("blockquote") ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-200"}`}
          size="sm"
          variant="light"
          onPress={() => {
            editor?.chain().focus().toggleBlockquote().run();
          }}
        >
          <ChatBubbleLeftRightIcon className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-gray-200 mx-1" />
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="text-gray-700 hover:bg-gray-200 min-w-[80px] flex items-center gap-1"
              size="sm"
              variant="light"
            >
              <span className="text-xs w-12 text-left">
                {editor?.getAttributes("fontSize").fontSize || "16px"}
              </span>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Font sizes"
            className="max-h-[400px] overflow-y-auto"
            selectedKeys={[
              editor?.getAttributes("fontSize").fontSize || "16px",
            ]}
            onAction={(size) =>
              editor
                ?.chain()
                .focus()
                .setFontSize(size as string)
                .run()
            }
          >
            {fontSizes.map((size) => (
              <DropdownItem key={size} className="text-sm">
                <span>{size}</span>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="text-gray-700 hover:bg-gray-200 flex items-center gap-1"
              size="sm"
              variant="light"
            >
              <div
                className="w-4 h-4 rounded border border-gray-300"
                style={{
                  backgroundColor:
                    editor?.getAttributes("textStyle").color || "black",
                }}
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Text colors" className="min-w-[240px]">
            <DropdownItem key="colors" className="p-2">
              <div className="grid grid-cols-10 gap-1">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`w-5 h-5 rounded hover:opacity-80 border border-gray-200 ${
                      editor?.getAttributes("textStyle").color === color
                        ? "ring-2 ring-offset-1 ring-black"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={(e) => {
                      e.preventDefault();
                      editor?.chain().focus().setColor(color).run();
                    }}
                  />
                ))}
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className="w-px h-6 bg-gray-200 mx-1" />
        <Button
          isIconOnly
          className="text-gray-700 hover:bg-gray-200"
          size="sm"
          variant="light"
          onPress={onPreviewClick}
        >
          <DocumentTextIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
