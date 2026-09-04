import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { FilePath } from '../models/file-path';
import { nestedCheckbox } from '../models/nested-checkbox.interface';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private httpClient = inject(HttpClient);

    getRecipeByName(name: string): Observable<any> {
        return this.httpClient.get<any>(`https://dummyjson.com/recipes/search?=${name}`);
    }

    isRecipeUnique(name: string): Observable<boolean> {
        console.log('is recipe unique service called')
        return of(name !== 'maggi');
    }


    getMockData(): Observable<FilePath[]> {
        return of([
            {
                id: 1,
                name: 'directory',
                files: [
                    { id: 1, name: 'file1.txt' },
                    { id: 2, name: 'file2.txt' }
                ],
            },
            {
                id: 2,
                name: 'file3.txt'
            },
            {
                id: 3,
                name: 'directory2',
                files: [
                    { id: 1, name: 'file4.txt' },
                    { id: 2, name: 'file5.txt' }
                ],
            },
            
        ]);
    }

    getNestedCheckboxData(): Observable<nestedCheckbox[]> {
        return of([
            {
                id: 1,
                name: 'Parent1',
                checked: false,
                children: [
                    {
                        id: 2,
                        name: 'Child1',
                        checked: false,
                        children: [
                            {
                                id: 3,
                                name: 'Grandchild1',
                                checked: false,
                                children: [
                                    {
                                        id: 4,
                                        name: 'GreatGrandchild1',
                                        checked: false,
                                        children: [
                                            {
                                                id: 5,
                                                name: 'GreatGreatGrandchild1',
                                                checked: false,
                                                children: [
                                                    {
                                                        id: 6,
                                                        name: 'Level6Child1',
                                                        checked: false,
                                                        children: [
                                                            {
                                                                id: 7,
                                                                name: 'Level7Child1',
                                                                checked: false,
                                                                children: [
                                                                    {
                                                                        id: 8,
                                                                        name: 'Level8Child1',
                                                                        checked: false,
                                                                        children: [
                                                                            {
                                                                                id: 9,
                                                                                name: 'Level9Child1',
                                                                                checked: false,
                                                                                children: [
                                                                                    {
                                                                                        id: 10,
                                                                                        name: 'Level10Child1',
                                                                                        checked: false,
                                                                                        children: [
                                                                                            {
                                                                                                id: 11,
                                                                                                name: 'SiblingLevel10Child1',
                                                                                                checked: false
                                                                                            },
                                                                                            {
                                                                                                id: 12,
                                                                                                name: 'SiblingLevel10Child2',
                                                                                                checked: false
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                id: 13,
                                                                                name: 'SiblingLevel9Child1',
                                                                                checked: false
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        id: 14,
                                                                        name: 'SiblingLevel8Child1',
                                                                        checked: false
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                id: 15,
                                                                name: 'SiblingLevel7Child1',
                                                                checked: false
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: 16,
                                                        name: 'SiblingLevel6Child1',
                                                        checked: false
                                                    }
                                                ]
                                            },
                                            {
                                                id: 17,
                                                name: 'SiblingGreatGreatGrandchild1',
                                                checked: false
                                            }
                                        ]
                                    },
                                    {
                                        id: 18,
                                        name: 'SiblingGreatGrandchild1',
                                        checked: false
                                    }
                                ]
                            },
                            {
                                id: 19,
                                name: 'SiblingGrandchild1',
                                checked: false
                            }
                        ]
                    },
                    {
                        id: 20,
                        name: 'SiblingChild1',
                        checked: false,
                        children: [
                            {
                                id: 21,
                                name: 'SiblingGrandchild2',
                                checked: false
                            }
                        ]
                    }
                ]
            },
            {
                id: 22,
                name: 'Parent2',
                checked: false,
                children: [
                    {
                        id: 23,
                        name: 'Child2',
                        checked: false,
                        children: [
                            {
                                id: 24,
                                name: 'Grandchild2',
                                checked: false,
                                children: [
                                    {
                                        id: 25,
                                        name: 'GreatGrandchild2',
                                        checked: false,
                                        children: [
                                            {
                                                id: 26,
                                                name: 'GreatGreatGrandchild2',
                                                checked: false,
                                                children: [
                                                    {
                                                        id: 27,
                                                        name: 'Level6Child2',
                                                        checked: false,
                                                        children: [
                                                            {
                                                                id: 28,
                                                                name: 'Level7Child2',
                                                                checked: false,
                                                                children: [
                                                                    {
                                                                        id: 29,
                                                                        name: 'Level8Child2',
                                                                        checked: false,
                                                                        children: [
                                                                            {
                                                                                id: 30,
                                                                                name: 'Level9Child2',
                                                                                checked: false,
                                                                                children: [
                                                                                    {
                                                                                        id: 31,
                                                                                        name: 'Level10Child2',
                                                                                        checked: false,
                                                                                        children: [
                                                                                            {
                                                                                                id: 32,
                                                                                                name: 'SiblingLevel10Child3',
                                                                                                checked: false
                                                                                            },
                                                                                            {
                                                                                                id: 33,
                                                                                                name: 'SiblingLevel10Child4',
                                                                                                checked: false
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                id: 34,
                                                                                name: 'SiblingLevel9Child2',
                                                                                checked: false
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        id: 35,
                                                                        name: 'SiblingLevel8Child2',
                                                                        checked: false
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                id: 36,
                                                                name: 'SiblingLevel7Child2',
                                                                checked: false
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: 37,
                                                        name: 'SiblingLevel6Child2',
                                                        checked: false
                                                    }
                                                ]
                                            },
                                            {
                                                id: 38,
                                                name: 'SiblingGreatGreatGrandchild2',
                                                checked: false
                                            }
                                        ]
                                    },
                                    {
                                        id: 39,
                                        name: 'SiblingGreatGrandchild2',
                                        checked: false
                                    }
                                ]
                            },
                            {
                                id: 40,
                                name: 'SiblingGrandchild3',
                                checked: false
                            }
                        ]
                    },
                    {
                        id: 41,
                        name: 'SiblingChild2',
                        checked: false
                    }
                ]
            }
        ]);
    }
}
