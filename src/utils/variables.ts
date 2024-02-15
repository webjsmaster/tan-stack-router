import {uuidv4} from "./uuid.ts";

export interface IItemDataFree {
    id?: string
    title: string
    type: 'folder' | 'file'
    items?: IItemDataFree[]
}

export const freeData: IItemDataFree[] = [
    {
        id: `container-1${uuidv4()}`,
        title: 'Container - 1',
        type: 'folder',
        items: [
            {
                id: `items-1-1${uuidv4()}`,
                title: 'Item - 1-1',
                type: 'folder',
                items: [
                    {
                        id: `file-1${uuidv4()}`,
                        title: 'File-1',
                        type: 'file'
                    }
                ]
            },
            {
                id: `items-1-2${uuidv4()}`,
                title: 'Item - 1-2',
                type: 'folder'
            },
        ]
    },
    {
        id: `container-2${uuidv4()}`,
        title: 'Container - 2',
        type: 'folder',
        items: [
            {
                id: `items-2-1${uuidv4()}`,
                title: 'Item - 2-1',
                type: 'folder',
                items: [
                    {
                        id: `items-2-1-1${uuidv4()}`,
                        title: 'Item - 2-1-1',
                        type: 'folder',
                        items: [
                            {
                                id: `items-2-1-1-1${uuidv4()}`,
                                title: 'Item - 2-1-1-1',
                                type: 'folder',
                                items: [
                                    {
                                        id: `file-2${uuidv4()}`,
                                        title: 'File-2',
                                        type: 'file'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: `items-2-1-2${uuidv4()}`,
                        title: 'Item - 2-1-2',
                        type: 'folder'
                    },
                ]
            },
            {
                id: `items-2-2${uuidv4()}`,
                title: 'Item - 2-2',
                type: 'folder',
            },
        ]
    },
];

let foldersIdCounter = 1
let camerasIdCounter = 1
let eventsIdCounter = 1

export const data = `[
    {
      "type": "folder",
      "id": ${foldersIdCounter++},
      "name": "Домик для гостей",
      "contains": [
        {
          "type": "folder",
          "id": ${foldersIdCounter++},
          "name": "Cпальня",
          "contains": [
            {
              "type": "camera",
              "id": ${camerasIdCounter++},
              "name": "Камера в углу",
              "realtime": true,
              "contains": [
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Гос.номера"
                },
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Лица"
                }
              ]
            },
            {
              "type": "camera",
              "id": ${camerasIdCounter++},
              "name": "Камера фронтовая",
              "contains": [
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Гос.номера"
                },
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Лица"
                }
              ]
            }
          ]
        },
        {
          "type": "folder",
          "id": ${foldersIdCounter++},
          "name": "Холл",
          "contains": [
            {
              "type": "camera",
              "id": ${camerasIdCounter++},
              "name": "Камера ночного видения",
              "realtime": true,
              "contains": [
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Гос.номера"
                },
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Лица"
                }
              ]
            },
            {
              "type": "camera",
              "id": ${camerasIdCounter++},
              "name": "Камера-тепловизор",
              "contains": [
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Гос.номера"
                },
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Лица"
                }
              ]
            }
          ]
        },
        {
          "type": "camera",
          "id": ${camerasIdCounter++},
          "name": "Камера широкоугольная",
          "realtime": true,
          "contains": [
            {
              "type": "events_group",
              "id": ${eventsIdCounter++},
              "name": "Гос.номера"
            },
            {
              "type": "events_group",
              "id": ${eventsIdCounter++},
              "name": "Лица"
            }
          ]
        },
        {
          "type": "camera",
          "id": ${camerasIdCounter++},
          "name": "Камера под плинтусом",
          "contains": [
            {
              "type": "events_group",
              "id": ${eventsIdCounter++},
              "name": "Гос.номера"
            },
            {
              "type": "events_group",
              "id": ${eventsIdCounter++},
              "name": "Лица"
            }
          ]
        }
      ]
    },
    {
      "type": "folder",
      "id": ${foldersIdCounter++},
      "name": "Гостиная",
      "contains": [
        {
          "type": "camera",
          "id": ${camerasIdCounter++},
          "name": "Скрытая камера",
          "contains": [
            {
              "type": "events_group",
              "id": ${eventsIdCounter++},
              "name": "Гос.номера"
            },
            {
              "type": "events_group",
              "id": ${eventsIdCounter++},
              "name": "Лица"
            }
          ]
        }
      ]
    },
    {
      "type": "folder",
      "id": ${foldersIdCounter},
      "name": "Гараж",
      "contains": []
    }
  ]`;
