import { createSlice } from "@reduxjs/toolkit"

const initialCentersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  centerForEdit: undefined,
  lastError: null,
  centerForRead: false,
  vehiclesForCenter: undefined,
}

export const callTypes = {
  list: "list",
  action: "action",
}

export const centersSlice = createSlice({
  name: "centers",
  initialState: initialCentersState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false
      } else {
        state.actionsLoading = false
      }
    },
    startCall: (state, action) => {
      state.error = null
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true
      } else {
        state.actionsLoading = true
      }
    },
    centersFetched: (state, action) => {
      const entities = action.payload.rows
      const totalResults = action.payload.totalResults
      state.listLoading = false
      state.error = null
      state.entities = entities
      state.totalCount = totalResults
    },
    //get User By ID
    centerFetched: (state, action) => {
      state.actionsLoading = false
      state.centerForEdit = action.payload.centerForEdit
      state.error = null
    },
    centerDeleted: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      )
    },
    centerCreated: (state, action) => {
      state.actionsLoading = false
      state.error = null
      state.entities.push(action.payload.user)
    },
    centerUpdated: (state, action) => {
      state.error = null
      state.actionsLoading = false
      // state.entities.push(action.payload)
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.updatedUser.id) {
          return action.payload.updatedUser
        }

        return entity
      })
    },
    vehiclesFetched: (state, action) => {
      const entities = action.payload
      state.error = null
      state.actionsLoading = false
      state.vehiclesForCenter = entities
    },
    // RolesFetched: (state, action) => {
    //   const entities = action.payload
    //   state.listLoading = false
    //   state.error = null
    //   state.roles = entities
    // },
    // CentersFetched: (state, action) => {
    //   const entities = action.payload
    //   state.listLoading = false
    //   state.error = null
    //   state.centers = entities
    // },
  },
})
