'use client';

import React, { useMemo, useRef } from 'react';
import { cn } from '@udecode/cn';
import { CommentsProvider } from '@udecode/plate-comments';
import { Plate, createPlateEditor } from '@udecode/plate-common';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { commentsUsers, myUserId } from '@/lib/plate/comments';
import { MENTIONABLES } from '@/lib/plate/mentionables';
import { plugins } from '@/lib/plate/plate-plugins';
import { CommentsPopover } from '@/components/plate-ui/comments-popover';
import { CursorOverlay } from '@/components/plate-ui/cursor-overlay';
import { Editor } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { MentionCombobox } from '@/components/plate-ui/mention-combobox';
import { deserializeHtml } from './deserializeHtml';
import { LINK_SPLITTER } from '@/lib/link';

export default function PlateEditor() {
  const containerRef = useRef(null);

  const data = '使用该插件以管理链接';
  const htmlValue = `<h1>Plate Link 调研</h1><a href='https://platejs.org/docs/link${LINK_SPLITTER}${data}'>Plate Link 官方文档</a>`;
  const initialValue = useMemo(() => {
    // const tmpEditor = createPlateEditor({ plugins });
    return deserializeHtml(plugins, { element: htmlValue });
  }, [htmlValue]);

  // const initialValue = [
  //   {
  //     id: '1',
  //     type: ELEMENT_PARAGRAPH,
  //     children: [{ text: 'Hello, World!' }],
  //   },
  // ];

  return (
    <DndProvider backend={HTML5Backend}>
      <CommentsProvider users={commentsUsers} myUserId={myUserId}>
        <Plate plugins={plugins} initialValue={initialValue as any}>
          <div
            ref={containerRef}
            className={cn(
              'relative',
              // Block selection
              '![&_.slate-start-area-left]:w-[64px] ![&_.slate-start-area-right]:w-[64px] ![&_.slate-start-area-top]:h-4'
            )}
          >
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>

            <Editor className="px-[96px] py-16"
              autoFocus
              focusRing={false}
              variant="ghost"
              size="md"
            />

            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>

            <MentionCombobox items={MENTIONABLES} />

            <CommentsPopover />

            <CursorOverlay containerRef={containerRef} />
          </div>
        </Plate>
      </CommentsProvider>
    </DndProvider>
  );
}
