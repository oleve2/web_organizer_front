
// base reducer models ------------------------------
export interface ItemModel {
  id: number,
  title: string,
  text: string,
  theme: string,
  part: string,
  prodLink?: string,

  tags_list: string,              // from api
  tags_list_json?: TCTagModel[],  // converted to Object
}

export interface PartModel {
  id?: number | undefined,
  part: string,
  cnt: number
}

// updownload reducer models ------------------------------
export interface IFileDownld {
  file_name: string,
  file_isdir: boolean,
}

export interface FilesInfoModel {
  files_list: IFileDownld[],
  serve_url: string,
}

export interface FilesInfoModelFilteredPaged {
  files_list: IFileDownld[][],
  serve_url: string,
}

export interface UploadFileModel {
  file: FileList, //File[],
}

export interface FileUpdateDeleteRequest {
  file_new_name: string,
  file_original: IFileDownld,
}

export interface FileUpdateDeleteResponseModel {
  file_original: IFileDownld,
  status:  boolean,
  error_str: string,
}


// auth reducer models ------------------------------
export interface LoginTokenModel {
  login: string,
  token: string,
}

// activities reducer models ------------------------------
export interface ActivityModel {
  id: number,
  name: string,
  date_start: string,
  date_end: string,
  norm_id: number,
}

export interface ActivityLogModel {
  id: number,
  activ_name_id?: number,
  activ_norm_id?: number,
  activ_date: string,
  activ_value: number,
  activ_name?: string,
}

// tagcloud reducer models ------------------------------
export interface TCTagModel {
  id: number,
  name: string,
  color?: string,
}


// page analytic models ------------------------------------
// request for data
export interface RequestRepCommModel {
  dateFrom: string,
  dateTo: string,
}

//1
export interface Data2Model {
  label: string,
  data: number[],
  backgroundColor: string,
  borderColor: string,
}
// rep common main (includes 1)
export interface RepCommonModel {
  chart_name_id: number,
  chart_name: string,
  labels: string[],
  data: number[],
  data2?: Data2Model,
}

//2
export interface DataActsModel {
  label: string,
  data: (number| null)[],

  backgroundColor?: string,
  borderColor?: string,
  skipNull?: boolean,  
}

// indiv graphs main (includes 2)
export interface RepIndivGraphsModel {
  labels: string[],
  datasets: DataActsModel[],
}



// draggable  -------------------------------------------------
/*export interface TCItemModel {
  item: string,
}
*/

// Calendar  -------------------------------------------------

export enum RowPlacement {
  mini = 'mini',
  full = 'full',
}

export enum CalendTaskStatus {
  default = '-',
  assigned = 'assigned',
  canceled = 'canceled',
  done = 'done'
}

export interface CalendarData {
  id: number,
  date: string,
  name: string,
  time_from: string,
  time_to: string,
  status: string,
}

export interface CalendarItemR {
  item_id: string,
  data: CalendarData[] | null
}

export enum CalendarMode {
  calendar = 'Calendar',
  list = 'List'
}


