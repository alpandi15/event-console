import React, { forwardRef, useEffect, useState } from 'react'
import 'grapesjs/dist/css/grapes.min.css'
import GrapesJS from 'grapesjs'
import grapesJSNewsLetter from 'grapesjs-preset-newsletter'
import juice from "juice";
import { useController } from 'react-hook-form';

function myPlugin(editor) {
  editor.BlockManager.add('plugin-ticket-number', {
    label: 'Ticket Number',
    content: '<div class="my-block">{{ticket_number}}</div>',
  });
  editor.BlockManager.add('plugin-attach-email', {
    label: 'Auto Recipient Email',
    content: '<div class="my-block">{{email}}</div>',
  });
  editor.BlockManager.add('plugin-attach-name', {
    label: 'Auto Recipient Name',
    content: '<div class="my-block">{{name}}</div>',
  });
  editor.BlockManager.add('plugin-attach-nickname', {
    label: 'Auto Recipient Nickname',
    content: '<div class="my-block">{{nickname}}</div>',
  });
  editor.BlockManager.add('plugin-attach-gender', {
    label: 'Auto Recipient Gender',
    content: '<div class="my-block">{{gender}}</div>',
  });
  editor.BlockManager.add('plugin-attach-birthday', {
    label: 'Auto Recipient Birthday',
    content: '<div class="my-block">{{birthday}}</div>',
  });
  editor.BlockManager.add('plugin-attach-phone_number', {
    label: 'Auto Recipient Phone Number',
    content: '<div class="my-block">{{phone_number}}</div>',
  });
}

const Grapes = forwardRef(({
  name,
  control,
  endpoint,
  token
}, ref) => {
  const [editor, setEditor] = useState()

  const {
    field
  } = useController({
    name,
    control
  });

  useEffect(() => {
    const e = GrapesJS.init({
      container: `#gjs`,
      forceClass: false,
      fromElement: true,
      storageManager: {
        options: {
          local: { key: 'gjsEventConsole' }
        }
      },
      assetManager: {
        upload: endpoint,
        headers: {
          Authorization: `Bearer ${token}`
        },
        uploadName: 'files',
        autoAdd: 1
      },
      height: 800,
      plugins: [
        myPlugin,
        // gjsBasicBlocks,
        // gjsPresentWebpage,
        grapesJSNewsLetter,
      ],
      pluginsOpts: {
        'grapesjs-preset-newsletter': {
          showBlocksOnLoad: true,
          inlineCss: true
        }
      }
    });

    var pnm = e.Panels;
    [
      ['sw-visibility', 'Show Borders'],
      ['preview', 'Preview'],
      ['fullscreen', 'Fullscreen'],
      ['undo', 'Undo'],
      ['redo', 'Redo'],
      ['gjs-open-import-template', 'Import'],
      ['canvas-clear', 'Clear canvas']
    ].forEach(function (item) {
      pnm.getButton('options', item[0]).set('attributes', { title: item[1], 'data-tooltip-pos': 'bottom' });
    });

    pnm.getButton('options', 'sw-visibility').set('active', 1);

    if (!editor) {
      e.on('load', function () {
        console.log('load')

        e.runCommand('core:canvas-clear')
      });

      e.on('update', (some, argument) => {
        const tmpl = e.getHtml() + `<style>${e.getCss()}</style>`;
        field.onChange(juice(tmpl))
      })

      setEditor(e)
    }
  }, [editor])

  useEffect(() => {
    if (editor) {
      if (field.value != undefined) {
        editor.setComponents(field.value)
      }
    }
  }, [editor, field.value])

  return (
    <div id="gjs"></div>
  );
})

Grapes.displayName = 'Grapes';

export default Grapes
