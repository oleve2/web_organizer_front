
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

// base reducer models ------------------------------
export interface FilesInfoModel {
  files_list: string[],
  serve_url: string,
}

// updownload reducer models ------------------------------
export interface UploadFileModel {
  file: FileList, //File[],
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
}*/

