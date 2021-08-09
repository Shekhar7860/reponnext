import React from 'react'
import agent from '../../../utils/agent';
import { defaultCurrency, defaultSlot } from '../../../utils/constant_value';
import Calendar from 'react-calendar';
import { checkCreateEditSlot, manamusuDateFormatter, timeDateByUser, timestampToYyyyMmDd, todayTimeDate } from '../../../utils/date_contant';
import BootstrapSpinner from '../../ui/spinner/BootstrapSpinner'
import { NumberValidation } from '../../../utils/validation_contant';
import Multiselect from 'multiselect-react-dropdown';
import { hhmmToampm } from '../../../utils/work_contant';

class StudentCreateRequest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            subject: "",
            teachStandard: "",
            houlyRate: "",
            description: "",
            currency: "",
            languageMap: new Map(),
            calendar_date: new Date(),
            selectedMap: new Map(),
            loading: false,
            error_info: { name: "", msg: "" },

            start_time: "00:00",
            end_time: "00:30",
            duration: "30",
            duration_time: "00:30",
            selectedTimeSlot: new Map(),
        }
    }
    setMyState = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value,
            error_info: { name: "", msg: "" }
        })
    }
    setLanguageMap = (params) => {
        const { languageMap } = this.state
        let langMap = languageMap
        langMap.set(params, params)
        this.setMyState("languageMap", langMap)
    }
    removeLanguageMap = (params) => {
        const { languageMap } = this.state
        let langMap = languageMap
        if (langMap.has(params)) {
            langMap.delete(params)
        } else {
            console.log("removeLanguageMap else", params, typeof params);
        }
        this.setMyState("languageMap", langMap)
    }
    createNewRequest = () => {
        const { title, subject, currency, teachStandard, houlyRate, description, languageMap, selectedTimeSlot } = this.state
        let finalLanguage = []
        let finalTimeSlot = []

        languageMap.forEach(res => {
            finalLanguage.push(res)
        })

        selectedTimeSlot.forEach((element, key1) => {
            let yyyymmdd = timestampToYyyyMmDd(key1)
            let time = []
            element.forEach(item => {
                time.push({
                    start_time: item.start_time,
                    end_time: item.end_time
                })
            });
            finalTimeSlot.push({
                "date": yyyymmdd,
                "time": time
            })
        });

        if (title && finalTimeSlot.length > 0 && currency) {
            this.setState({
                ...this.state,
                loading: true
            }, () => {

                const info = {
                    "title": title,
                    "subject": subject,
                    "teaching_standards": teachStandard,
                    "language": finalLanguage,
                    "hourly_rate": houlyRate,
                    "description": description,
                    "currency": currency,
                    "time_slot": finalTimeSlot
                }
                console.log("create new post info", info);
                agent.setToken(this.props.user_info.token)
                agent.Auth.createRequest(info).then(res => {
                    console.log("Create request res", res);
                    this.props.router.back()
                }).catch(err => {
                    this.setState({
                        ...this.state,
                        loading: false
                    })
                })
            })

        } else {
            setErrorInfo({ name: "title", msg: "Required title" })
        }
    }


    render() {
        const { title, subject, teachStandard, houlyRate, description, languageMap, calendar_date, selectedMap, loading, error_info, duration, start_time, end_time, currency } = this.state
        const { languages, subjects } = this.props
        return <section>
            <div class="main-section">
                <div class="container">
                    <form onSubmit={(e) => { e.preventDefault(); this.createNewRequest() }}>
                        <div>
                            <div class="main-heading me-4">
                                <h2 class="sub-heading mb-0 fs-24">Create Request</h2>
                            </div>
                            <div class="row gx-md-5">
                                <div class="col-xl-3 col-lg-4 col-md-6 mt-4">
                                    <label class="form-label d-block">Request Title</label>
                                    <input type="text" class="form-control" placeholder="Request title" value={title} name="title" onChange={(e) => this.setMyState(e.target.name, e.target.value)} required />
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-6 mt-4">
                                    <label class="form-label d-block">Subject</label>
                                    {/* <input type="text" class="form-control" placeholder="Add subject" value={subject} onChange={(e) => setSubject(e.target.value)} required /> */}
                                    <select class="form-select" aria-label="Default select example" value={subject} name="subject" onChange={(e) => this.setMyState(e.target.name, e.target.value)} required>
                                        <option value="">Select Subject</option>
                                        {this.createDropdown(subjects)}
                                    </select>
                                </div>
                            </div>
                            <div class="row gx-md-5">
                                <div class="col-xl-3 col-lg-4 col-md-6 mt-4">
                                    <label class="form-label d-block">Teaching Standards</label>
                                    {/* <input type="text" class="form-control" placeholder="Teaching Standards" value={teachStandard} name="teachStandard" onChange={(e) => this.setMyState(e.target.name, e.target.value)} required /> */}
                                    <select class="form-select" aria-label="Default select example" value={teachStandard} name="teachStandard" onChange={(e) => this.setMyState(e.target.name, e.target.value)} required>
                                        <option value="">Select Teaching Standards</option>
                                        {this.createDropdown(this.props.teaching_standards)}
                                    </select>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-6 mt-4">
                                    <label class="form-label d-block">Language</label>
                                    <Multiselect
                                        options={languages} // Options to display in the dropdown
                                        selectedValues={""} // Preselected value to persist in dropdown
                                        onSelect={(selectedList, selectedItem) => {
                                            console.log("onSelect selectedList", selectedList, selectedItem);
                                            this.setLanguageMap(`${selectedItem.id}`)

                                        }} // Function will trigger on select event
                                        onRemove={(selectedList, removedItem) => {
                                            console.log("onRemove", selectedList, removedItem);
                                            this.removeLanguageMap(`${removedItem.id}`)
                                        }} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                        style={{
                                            option: { // To change css for dropdown options
                                                color: "#FFFFFF",
                                                background: "#00674763"

                                            },
                                            chips: { // To change css chips(Selected options)
                                                background: "#006747"
                                            },
                                        }}
                                    />
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-6 mt-4">
                                    <label class="form-label d-block">Hourly Rate</label>
                                    <div class="input-group">
                                        <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon" name="currency" value={currency} onChange={(e) => this.setMyState(e.target.name, e.target.value)}>
                                            <option value="" >Choose...</option>
                                            {defaultCurrency.map((res) => { return <option value={res.value}>{res.name}</option> })}
                                        </select>
                                        <div class="d-flex align-items-center">
                                            <input type="text" class="form-control" placeholder="Enter amount" value={houlyRate} name="houlyRate" onChange={(e) => NumberValidation(e.target.value) ? this.setMyState(e.target.name, e.target.value) : ""} required disabled={currency === ""} />
                                            <span class="ms-2">/hr</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-9 mt-4">
                                    <label class="form-label d-block">Description</label>
                                    <textarea type="text" class="form-control" placeholder="Write here..." rows="3" value={description} name="description" onChange={(e) => this.setMyState(e.target.name, e.target.value)} required></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="mt-5">
                            <div class="row">
                                <div className="col">
                                    <div class="card mt-4 shadow-lg">
                                        <div class="card-body">

                                            <Calendar
                                                onChange={(e) => this.setMyState("calendar_date", new Date(e))}
                                                value={calendar_date}
                                                minDate={new Date()} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div class="card mt-4 shadow-lg">
                                        <div class="card-body">
                                            <div class="row justify-content-between">
                                                {this.createTimeChips()}
                                                <button type="button" id="selectDateModalBtn" class=" btn btn-ouline mt-2" data-bs-toggle="modal" data-bs-target="#selectTimeModalTarget" >+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="mt-5">
                                {loading ?
                                    <BootstrapSpinner /> :
                                    <button type="submit" class="btn btn-primary px-5" >Create New Request</button>
                                }

                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* modal */}

            <div class="modal fade" id="addTime" tabindex="-1" aria-labelledby="addTimeLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row justify-content-between">
                                        {/* {getModalSlots(selectSlotFor)} */}
                                    </div>
                                    <div class="text-center py-3">
                                        <button type="button" class=" btn btn-ouline mt-1">+ Customize Time</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="modal fade" id="selectTimeModalTarget" tabIndex="-1" aria-labelledby="selectTimeModal" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); }} >
                            <div class="modal-body">
                                <div class="text-center mb-4">
                                    <h4 class="modal-title">Select Time for {manamusuDateFormatter(calendar_date.getTime())}</h4>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Duration (minutes)</label>
                                    <input type="number" placeholder="Select Duration" className="form-control" step="30" name="start_time" min="30" max="1800" value={duration} onChange={(e) => this.changeDurationTime(e.target.value)} />
                                    {/* <input type="time" placeholder="Select Duration" className="form-control" name="start_time" min="00:30" value={duration_time} onChange={(e) => this.changeDurationTime(e.target.value)} /> */}
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Start Time</label>
                                    <input type="time" placeholder="Start Time" className="form-control" name="start_time" value={start_time} onChange={(e) => { this.setState({ ...this.state, start_time: e.target.value, start_time_number: e.target.valueAsNumber }, () => this.getEndTime()) }} />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">End Time</label>
                                    <input type="time" placeholder="End Time" className="form-control" name="end_time" value={end_time} onChange={(e) => { this.setState({ ...this.state, end_time: e.target.value, end_time_number: e.target.valueAsNumber }) }} disabled />
                                </div>
                            </div>
                            <div class="modal-footer justify-content-center py-4 border-0">
                                <button type="button" id="selectDateModalBtnClose" class="btn btn-primary py-2 px-5" data-bs-dismiss="modal" onClick={() => this.initialiseSlot(start_time, end_time)}  >CONFIRM</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    }
    createDropdown = (params) => {
        const items = params ? params : []
        let rowData = []
        items.forEach(element => {
            rowData.push(<option value={`${element.id}`}>{element.name}</option>)
        });
        return rowData
    }
    // initialiseSlot = (params) => {
    //     const { selectedMap, calendar_date } = this.state
    //     let mapKey = `${timeDateByUser(calendar_date).getTime()}|${params.start_time}|${params.end_time}`
    //     console.log("initialiseSlot", params, "mapKey", mapKey, "calendar data", calendar_date);
    //     let localSelectedMap = selectedMap
    //     if (localSelectedMap.has(mapKey)) {
    //         localSelectedMap.delete(mapKey)
    //     } else {
    //         localSelectedMap.set(mapKey, { date: calendar_date, start: params.start_time, end: params.end_time })
    //     }
    //     this.setMyState("selectedMap", localSelectedMap)
    // }


    changeDurationTime = (mins) => {
        let h = Math.floor(mins / 60);
        let m = mins % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        const duration_time = `${h}:${m}`
        this.setState({
            ...this.state,
            duration_time: duration_time,
            duration: mins
        }, () => {
            this.getEndTime()
        })
    }
    getEndTime = () => {
        let extra = 0
        const { start_time, duration_time } = this.state
        let startArr = start_time.split(":")
        let durationTimeArr = duration_time.split(":")
        let st2 = Number(startArr[1]) + Number(durationTimeArr[1])
        if (st2 >= 60) {
            st2 -= 60
            extra = 1
        }
        let st1 = Number(startArr[0]) + Number(durationTimeArr[0]) + extra
        this.setState({
            ...this.state,
            end_time: `${(st1 > 9) ? st1 : `0${st1}`}:${(st2 > 9) ? st2 : `0${st2}`}`
        })
    }

    initialiseSlot = (start_time, end_time) => {
        console.log("initialiseSlot start_time", start_time, "end_time", end_time);

        const { selectedTimeSlot, calendar_date } = this.state
        let timeDateBy = timeDateByUser(calendar_date)

        let rowSelectedTimeSlot = selectedTimeSlot

        let mapKey = timeDateBy.getTime()
        let innerMapKey = `${start_time}${end_time}`


        if (rowSelectedTimeSlot.has(mapKey)) {
            let innerMap = rowSelectedTimeSlot.get(mapKey)
            // let innerMap = new Map()
            if (innerMap.has(innerMapKey)) {
                innerMap.delete(innerMapKey)
            } else {
                innerMap.set(innerMapKey, { start_time: start_time, end_time: end_time })
            }
            rowSelectedTimeSlot.set(mapKey, innerMap)
        } else {
            let innerMap = new Map()
            innerMap.set(innerMapKey, { start_time: start_time, end_time: end_time })
            rowSelectedTimeSlot.set(mapKey, innerMap)
        }

        this.setState({
            ...this.state,
            selectedTimeSlot: rowSelectedTimeSlot,
            start_time: "00:00",
            duration: "30",
            end_time: "00:30"
        })
    }

    // createTimeChips = () => {
    //     const { selectedMap, calendar_date } = this.state
    //     let rowData = [];

    //     defaultSlot.forEach(res => {
    //         let mapKey = `${timeDateByUser(calendar_date).getTime()}|${res.start_time}|${res.end_time}`
    //         if (checkCreateEditSlot(calendar_date, res.start_time)) {
    //             rowData.push(<div class="col-6 col-sm-4 mt-4">
    //                 <span class={`btn-ouline  ${selectedMap.has(mapKey) ? "btn-primary" : ""} `} onClick={() => this.initialiseSlot(res)}>{res.title}</span>
    //             </div>)
    //         } else {
    //             rowData.push(<div class="col-6 col-sm-4 mt-4">
    //                 <span class={`btn-ouline my-disabled`} >{res.title}</span>
    //             </div>)
    //         }
    //     })
    //     return rowData
    // }
    createTimeChips = () => {
        const { selectedTimeSlot, calendar_date } = this.state
        let timeDateBy = timeDateByUser(calendar_date)

        let mapKey = timeDateBy.getTime()
        let rowData = [];

        if (selectedTimeSlot.has(mapKey)) {
            let innerMap = selectedTimeSlot.get(mapKey)
            innerMap.forEach(element => {
                console.log("innerMap element", element);
                rowData.push(<div class="col-6 col-sm-6 mt-4">
                    <span class={`btn-ouline btn-primary`} onClick={() => this.initialiseSlot(element.start_time, element.end_time)}>{hhmmToampm(element.start_time)} - {hhmmToampm(element.end_time)}</span>
                </div>)
            });
        }
        return rowData

    }
    getSelectedLanguage = (languageMap, languages) => {
        let rowData = []
        languageMap.forEach((element, key) => {
            let lang = languages.filter((res) => res.id == element)
            if (lang.length > 0) {
                rowData.push(<span key={key} class="time-btn me-3 cursor-pointer" onClick={(e) => this.removeLanguageMap(`${lang[0].id}`)}> {lang[0].name} </span>)
            }
        });
        return rowData
    }
    componentDidMount() {

    }
}
export default StudentCreateRequest
