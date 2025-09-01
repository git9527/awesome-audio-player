import { FileSystemItem } from "./types";

export const mockFileSystem: Record<string, FileSystemItem[]> = {
    "/": [
        {
            "type": "folder",
            "name": "Others",
            "path": "/Others"
        },
        {
            "type": "folder",
            "name": "Unit 1",
            "path": "/Unit%201"
        },
        {
            "type": "folder",
            "name": "Unit 2",
            "path": "/Unit%202"
        },
        {
            "type": "folder",
            "name": "Unit 3",
            "path": "/Unit%203"
        },
        {
            "type": "folder",
            "name": "Unit 4",
            "path": "/Unit%204"
        },
        {
            "type": "folder",
            "name": "Unit 5",
            "path": "/Unit%205"
        },
        {
            "type": "folder",
            "name": "Unit 6",
            "path": "/Unit%206"
        },
        {
            "type": "file",
            "name": "01 Starter.mp3",
            "path": "/01%20Starter.mp3"
        }
    ],
    "/Others": [
        {
            "type": "file",
            "name": "38 Culture corner\uff1aExploring China.mp3",
            "path": "/Others/38%20Culture%20corner%EF%BC%9AExploring%20China.mp3"
        },
        {
            "type": "file",
            "name": "39 Culture corner\uff1aExploring the world.mp3",
            "path": "/Others/39%20Culture%20corner%EF%BC%9AExploring%20the%20world.mp3"
        },
        {
            "type": "file",
            "name": "40 Literature corner\uff1aA chapter to start with.mp3",
            "path": "/Others/40%20Literature%20corner%EF%BC%9AA%20chapter%20to%20start%20with.mp3"
        },
        {
            "type": "file",
            "name": "41 Literature corner\uff1aA scene to act out.mp3",
            "path": "/Others/41%20Literature%20corner%EF%BC%9AA%20scene%20to%20act%20out.mp3"
        },
        {
            "type": "file",
            "name": "42 Literature corner\uff1aA poem to savour.mp3",
            "path": "/Others/42%20Literature%20corner%EF%BC%9AA%20poem%20to%20savour.mp3"
        },
        {
            "type": "file",
            "name": "43 Sound file.mp3",
            "path": "/Others/43%20Sound%20file.mp3"
        },
        {
            "type": "file",
            "name": "44 Proper nouns and glossary.mp3",
            "path": "/Others/44%20Proper%20nouns%20and%20glossary.mp3"
        },
        {
            "type": "file",
            "name": "45 Numbers.mp3",
            "path": "/Others/45%20Numbers.mp3"
        },
        {
            "type": "file",
            "name": "46 Months and days.mp3",
            "path": "/Others/46%20Months%20and%20days.mp3"
        }
    ],
    "/Unit 1": [
        {
            "type": "file",
            "name": "02 Unit 1 School life.mp3",
            "path": "/Unit%201/02%20Unit%201%20School%20life.mp3"
        },
        {
            "type": "file",
            "name": "03 Unit 1 Viewing and listening.mp3",
            "path": "/Unit%201/03%20Unit%201%20Viewing%20and%20listening.mp3"
        },
        {
            "type": "file",
            "name": "04 Unit 1 Speaking.mp3",
            "path": "/Unit%201/04%20Unit%201%20Speaking.mp3"
        },
        {
            "type": "file",
            "name": "05 Unit 1 Reading.mp3",
            "path": "/Unit%201/05%20Unit%201%20Reading.mp3"
        },
        {
            "type": "file",
            "name": "06 Unit 1 Discovery.mp3",
            "path": "/Unit%201/06%20Unit%201%20Discovery.mp3"
        },
        {
            "type": "file",
            "name": "07 Unit 1 Words and expressions.mp3",
            "path": "/Unit%201/07%20Unit%201%20Words%20and%20expressions.mp3"
        }
    ],
    "/Unit 2": [
        {
            "type": "file",
            "name": "08 Unit 2 Family ties.mp3",
            "path": "/Unit%202/08%20Unit%202%20Family%20ties.mp3"
        },
        {
            "type": "file",
            "name": "09 Unit 2 Viewing and listening.mp3",
            "path": "/Unit%202/09%20Unit%202%20Viewing%20and%20listening.mp3"
        },
        {
            "type": "file",
            "name": "10 Unit 2 Speaking.mp3",
            "path": "/Unit%202/10%20Unit%202%20Speaking.mp3"
        },
        {
            "type": "file",
            "name": "11 Unit 2 Reading.mp3",
            "path": "/Unit%202/11%20Unit%202%20Reading.mp3"
        },
        {
            "type": "file",
            "name": "12 Unit 2 Discovery.mp3",
            "path": "/Unit%202/12%20Unit%202%20Discovery.mp3"
        },
        {
            "type": "file",
            "name": "13 Unit 2 Words and expressions.mp3",
            "path": "/Unit%202/13%20Unit%202%20Words%20and%20expressions.mp3"
        }
    ],
    "/Unit 3": [
        {
            "type": "file",
            "name": "14 Unit 3 Food.mp3",
            "path": "/Unit%203/14%20Unit%203%20Food.mp3"
        },
        {
            "type": "file",
            "name": "15 Unit 3 Viewing and listening.mp3",
            "path": "/Unit%203/15%20Unit%203%20Viewing%20and%20listening.mp3"
        },
        {
            "type": "file",
            "name": "16 Unit 3 Speaking.mp3",
            "path": "/Unit%203/16%20Unit%203%20Speaking.mp3"
        },
        {
            "type": "file",
            "name": "17 Unit 3 Reading.mp3",
            "path": "/Unit%203/17%20Unit%203%20Reading.mp3"
        },
        {
            "type": "file",
            "name": "18 Unit 3 Discovery.mp3",
            "path": "/Unit%203/18%20Unit%203%20Discovery.mp3"
        },
        {
            "type": "file",
            "name": "19 Unit 3 Words and expressions.mp3",
            "path": "/Unit%203/19%20Unit%203%20Words%20and%20expressions.mp3"
        }
    ],
    "/Unit 4": [
        {
            "type": "file",
            "name": "20 Unit 4 Sports.mp3",
            "path": "/Unit%204/20%20Unit%204%20Sports.mp3"
        },
        {
            "type": "file",
            "name": "21 Unit 4 Viewing and listening.mp3",
            "path": "/Unit%204/21%20Unit%204%20Viewing%20and%20listening.mp3"
        },
        {
            "type": "file",
            "name": "22 Unit 4 Speaking.mp3",
            "path": "/Unit%204/22%20Unit%204%20Speaking.mp3"
        },
        {
            "type": "file",
            "name": "23 Unit 4 Reading.mp3",
            "path": "/Unit%204/23%20Unit%204%20Reading.mp3"
        },
        {
            "type": "file",
            "name": "24 Unit 4 Discovery.mp3",
            "path": "/Unit%204/24%20Unit%204%20Discovery.mp3"
        },
        {
            "type": "file",
            "name": "25 Unit 4 Words and expressions.mp3",
            "path": "/Unit%204/25%20Unit%204%20Words%20and%20expressions.mp3"
        }
    ],
    "/Unit 5": [
        {
            "type": "file",
            "name": "26 Unit 5 Animals and us.mp3",
            "path": "/Unit%205/26%20Unit%205%20Animals%20and%20us.mp3"
        },
        {
            "type": "file",
            "name": "27 Unit 5 Viewing and listening.mp3",
            "path": "/Unit%205/27%20Unit%205%20Viewing%20and%20listening.mp3"
        },
        {
            "type": "file",
            "name": "28 Unit 5 Speaking.mp3",
            "path": "/Unit%205/28%20Unit%205%20Speaking.mp3"
        },
        {
            "type": "file",
            "name": "29 Unit 5 Reading.mp3",
            "path": "/Unit%205/29%20Unit%205%20Reading.mp3"
        },
        {
            "type": "file",
            "name": "30 Unit 5 Discovery.mp3",
            "path": "/Unit%205/30%20Unit%205%20Discovery.mp3"
        },
        {
            "type": "file",
            "name": "31 Unit 5 Words and expressions.mp3",
            "path": "/Unit%205/31%20Unit%205%20Words%20and%20expressions.mp3"
        }
    ],
    "/Unit 6": [
        {
            "type": "file",
            "name": "32 Unit 6 Travelling around China.mp3",
            "path": "/Unit%206/32%20Unit%206%20Travelling%20around%20China.mp3"
        },
        {
            "type": "file",
            "name": "33 Unit 6 Viewing and listening.mp3",
            "path": "/Unit%206/33%20Unit%206%20Viewing%20and%20listening.mp3"
        },
        {
            "type": "file",
            "name": "34 Unit 6 Speaking.mp3",
            "path": "/Unit%206/34%20Unit%206%20Speaking.mp3"
        },
        {
            "type": "file",
            "name": "35 Unit 6 Reading.mp3",
            "path": "/Unit%206/35%20Unit%206%20Reading.mp3"
        },
        {
            "type": "file",
            "name": "36 Unit 6 Discovery.mp3",
            "path": "/Unit%206/36%20Unit%206%20Discovery.mp3"
        },
        {
            "type": "file",
            "name": "37 Unit 6 Words and expressions.mp3",
            "path": "/Unit%206/37%20Unit%206%20Words%20and%20expressions.mp3"
        }
    ]
};
