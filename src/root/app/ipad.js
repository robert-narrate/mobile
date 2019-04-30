import Navigation from 'modules/navigation'
import { store } from 'data'
import { setLastTab } from 'local/actions'

export default async(state, firstRun)=>{
    //Persist tabIndex
    if (firstRun) {
        Navigation.events().registerBottomTabSelectedListener(({ selectedTabIndex }) => {
            store.dispatch(setLastTab(selectedTabIndex))
        })
    }

    return {
        root: {
            splitView: {
                master: {
                    stack: {
                        children: [
                            Navigation.getComponent('collections/home/ipad', { spaceId: state.lastCollection })
                        ]
                    }
                },
                detail: {
                    stack: {
                        id: 'detail',
                        children: [
                            Navigation.getComponent('bookmarks/home', { spaceId: state.lastCollection })
                        ]
                    }
                },
                options: {
                    splitView: {
                        displayMode: 'visible',
                        primaryEdge: 'leading',
                        minWidth: 250,
                        maxWidth: 400,
                    }
                }
            }
        }
    }
}