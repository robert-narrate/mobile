import { createSelector } from 'reselect'
import {
	blankSelectMode
} from '../../helpers/bookmarks'

const
	_selectMode = ({bookmarks={}})=>bookmarks.selectMode,
	getId = (state,spaceId,_id)=>_id,
	getspaceId = (state,spaceId)=>spaceId

//Select Mode
export const makeSelectMode = ()=>createSelector(
	[({bookmarks={}}, _id)=>{
		if (bookmarks.selectMode.spaceId != _id)
			return blankSelectMode
		
		return bookmarks.selectMode
	}],
	(selectMode)=>selectMode
)

export const selectModeEnabled = ({bookmarks}, _id) => bookmarks.selectMode.spaceId == _id && bookmarks.selectMode.enabled

export const makeIsSelected = ()=>createSelector(
	[_selectMode, getspaceId, getId],
	(selectMode, spaceId, _id)=>{
		if (!selectMode.enabled)
			return false;

		if (selectMode.spaceId != spaceId)
			return false;

		if (selectMode.ids.indexOf(_id)!=-1)
			return true;

		return false;
	}
)