import { useRouter } from 'next/router';
import React, { useState } from 'react'
import agent from '../../../utils/agent';
import { defaultCurrency, defaultSlot } from '../../../utils/constant_value';
import language_contant from '../../../utils/language_contant';
import BootstrapSpinner from '../../ui/spinner/BootstrapSpinner';
import Multiselect from 'multiselect-react-dropdown';
import { NumberValidation } from '../../../utils/validation_contant';
import { manamusuDateFormatter } from '../../../utils/date_contant';
import { hhmmToampm } from '../../../utils/work_contant';
class CreatePost extends React.Component {

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

            selectSlotFor: "",

            duration: "30",
            duration_time: "00:30",
            start_time: "00:00",
            end_time: "00:30",

            sundaySlot: new Map(),
            mondaySlot: new Map(),
            tuesdaySlot: new Map(),
            wednesdaySlot: new Map(),
            thursdaySlot: new Map(),
            fridaySlot: new Map(),
            saturdaySlot: new Map(),

            sundaySlotchecked: false,
            mondaySlotchecked: false,
            tuesdaySlotchecked: false,
            wednesdaySlotchecked: false,
            thursdaySlotchecked: false,
            fridaySlotchecked: false,
            saturdaySlotchecked: false,

            loading: false,
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
    createDropdown = (params) => {
        const items = params ? params : []
        let rowData = []
        items.forEach((element, index) => {
            rowData.push(<option key={index} value={`${element.id}`}>{element.name}</option>)
        });
        return rowData
    }

    createNewPost = () => {
        const { title, subject, currency, houlyRate, teachStandard, description, languageMap, sundaySlot, sundaySlotchecked, mondaySlot, mondaySlotchecked, tuesdaySlot, tuesdaySlotchecked, wednesdaySlot, wednesdaySlotchecked, thursdaySlot, thursdaySlotchecked, fridaySlot, fridaySlotchecked, saturdaySlot, saturdaySlotchecked } = this.state
        let finalLanguage = []
        let finalTimeSlot = []
        languageMap.forEach(res => {
            finalLanguage.push(res)
        })

        if (sundaySlotchecked) {
            let time = []
            sundaySlot.forEach(element => {
                console.log("sunday ele", element);
                time.push({
                    "start_time": element.start_time,
                    "end_time": element.end_time
                })
            });

            finalTimeSlot.push(
                {
                    "day": 1,
                    "time": time
                }
            )
        }
        if (mondaySlotchecked) {
            let time = []

            mondaySlot.forEach(element => {
                console.log("mondaySlot ele", element);
                time.push({
                    "start_time": element.start_time,
                    "end_time": element.end_time
                })

            });
            finalTimeSlot.push(
                {
                    "day": 2,
                    "time": time
                }
            )
        }
        if (tuesdaySlotchecked) {
            let time = []

            tuesdaySlot.forEach(element => {
                console.log("tuesdaySlot ele", element);
                time.push({
                    "start_time": element.start_time,
                    "end_time": element.end_time
                })

            });
            finalTimeSlot.push(
                {
                    "day": 3,
                    "time": time
                }
            )
        }
        if (wednesdaySlotchecked) {
            let time = []

            wednesdaySlot.forEach(element => {
                console.log("wednesdaySlot ele", element);
                time.push({
                    "start_time": element.start_time,
                    "end_time": element.end_time
                })

            });
            finalTimeSlot.push(
                {
                    "day": 4,
                    "time": time
                }
            )
        }
        if (thursdaySlotchecked) {
            let time = []

            thursdaySlot.forEach(element => {
                console.log("thursdaySlot ele", element);
                time.push({
                    "start_time": element.start_time,
                    "end_time": element.end_time
                })

            });
            finalTimeSlot.push(
                {
                    "day": 5,
                    "time": time
                }
            )
        }
        if (fridaySlotchecked) {
            let time = []

            fridaySlot.forEach(element => {
                console.log("fridaySlot ele", element);
                time.push({
                    "start_time": element.start_time,
                    "end_time": element.end_time
                })

            });
            finalTimeSlot.push(
                {
                    "day": 6,
                    "time": time
                }
            )
        }
        if (saturdaySlotchecked) {
            let time = []

            saturdaySlot.forEach(element => {
                console.log("saturdaySlot ele", element);
                time.push({
                    "start_time": element.start_time,
                    "end_time": element.end_time
                })

            });
            finalTimeSlot.push(
                {
                    "day": 7,
                    "time": time
                }
            )
        }

        const info = {
            title: title,
            subject: subject,
            teaching_standards: teachStandard,
            language: finalLanguage,
            hourly_rate: houlyRate,
            currency: currency,
            description: description,
            time_slot: finalTimeSlot
        }
        console.log("create new post info", info);
        if (finalTimeSlot.length > 0 && currency) {
            this.setState({
                ...this.state,
                loading: true
            }, () => {
                agent.Auth.createPost(info).then(res => {
                    console.log("createPost res", res);
                    this.setState({
                        ...this.state,
                        loading: false
                    })
                    this.props.router.back()
                }).catch(err => {
                    console.log("createPost err", err);
                    this.setState({
                        ...this.state,
                        loading: false
                    })
                })
            })
        }

    }

    goToLink = (params) => {
        const { router } = this.props
        if (router) {
            router.push(`/${router.query.lang}/${params}`)
        }
    }
    render() {
        const { title, subject, teachStandard, houlyRate, description, currency, duration, start_time, end_time,
            sundaySlot, mondaySlot, tuesdaySlot, wednesdaySlot, thursdaySlot, fridaySlot, saturdaySlot, loading,
            sundaySlotchecked, mondaySlotchecked, tuesdaySlotchecked, wednesdaySlotchecked, thursdaySlotchecked, fridaySlotchecked, saturdaySlotchecked } = this.state
        const { subjects, teaching_standards, languages, liveProfile } = this.props
        return <section>
            <div class="main-section">
                <div class="container">
                    <form onSubmit={(e) => { e.preventDefault(); this.createNewPost() }}>
                        <div>
                            <div class="main-heading me-4">
                                <h2 class="sub-heading mb-0 fs-24">Create Post</h2>
                            </div>
                            <div class="row gx-md-5">
                                <div class="col-xl-3 col-lg-4 col-md-6 mt-4">
                                    <label class="form-label d-block">Post Title</label>
                                    <input type="text" class="form-control" placeholder="Post title" value={title} name="title" onChange={(e) => this.setMyState(e.target.name, e.target.value)} required />
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-6 mt-4">
                                    <label class="form-label d-block">Subject</label>
                                    {/* <input type="text" class="form-control" placeholder="Add subject" required /> */}
                                    <select class="form-select" aria-label="Default select example" value={subject} name="subject" onChange={(e) => this.setMyState(e.target.name, e.target.value)} required>
                                        <option value="">Select Subject</option>
                                        {this.createDropdown(subjects)}
                                    </select>
                                </div>
                            </div>
                            <div class="row gx-md-5">
                                <div class="col-xl-3 col-lg-4 col-md-6 mt-4">
                                    <label class="form-label d-block">Teaching Standards</label>
                                    {/* <input type="text" class="form-control" placeholder="Teaching Standards" value={teachStandard} onChange={(e) => setTeachStandard(e.target.value)} required /> */}
                                    <select class="form-select" aria-label="Default select example" value={teachStandard} name="teachStandard" onChange={(e) => this.setMyState(e.target.name, e.target.value)} required>
                                        <option value="">Select Teaching Standards</option>
                                        {this.createDropdown(teaching_standards)}
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
                                <div class="col-xl-6 col-md-12 mt-4">
                                    <div class="main-heading me-4">
                                        <h2 class="sub-heading mb-0 fs-24">Manage your Availability</h2>
                                    </div>
                                    <div class="row gx-md-5 flex-lg-nowrap align-items-center">
                                        <div class="col-lg-6 mt-4">
                                            <div class="d-flex justify-content-between">
                                                <div class="form-check mb-0">
                                                    <input class="form-check-input me-4" type="checkbox" value="" id="checkBox-1" checked={sundaySlotchecked} name="sundaySlotchecked" onChange={(e) => this.setMyState(e.target.name, e.target.checked)} />
                                                    <label class="form-check-label text-uppercase" for="checkBox-1">Sunday</label>
                                                </div>
                                                <div class="d-flex align-items-center text-primary cursor-pointer" data-bs-toggle="modal" data-bs-target="#addTime">
                                                    {sundaySlotchecked ? <>
                                                        <i class="fas fa-plus-circle me-3"></i>
                                                        <span onClick={() => this.setSelectSlotFor("sunday")}>Add Time Slot</span>
                                                    </>
                                                        : <></>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 mt-4">
                                            <div class="d-flex align-items-center">
                                                <div class="time-slot">
                                                    {this.getDaySlotList(sundaySlot, false)}
                                                </div>
                                                {(sundaySlot.size > 0) ?
                                                    <div class="bg-gradiant d-flex align-items-center ps-4">
                                                        {/* <i class="fas fa-pen me-3 text-primary cursor-pointer" data-bs-toggle="modal" data-bs-target="#editTimeslot" onClick={() => this.setSelectSlotFor("sunday")}></i> */}
                                                        {/* <i class="fas fa-trash text-danger cursor-pointer" onClick={() => this.setState({ ...this.state, sundaySlot: new Map(), sundaySlotchecked: false })}></i> */}
                                                        <i class="fas fa-trash text-danger cursor-pointer" data-bs-toggle="modal" data-bs-target="#editTimeslot" onClick={() => this.setSelectSlotFor("sunday")}></i>
                                                    </div>
                                                    : <></>}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row gx-md-5 flex-lg-nowrap align-items-center">
                                        <div class="col-lg-6 mt-4">
                                            <div class="d-flex justify-content-between">
                                                <div class="form-check mb-0">
                                                    <input class="form-check-input me-4" type="checkbox" value="" id="checkBox-2" checked={mondaySlotchecked} name="mondaySlotchecked" onChange={(e) => this.setMyState(e.target.name, e.target.checked)} />
                                                    <label class="form-check-label text-uppercase" for="checkBox-2">Monday</label>
                                                </div>
                                                <div class="d-flex align-items-center text-primary cursor-pointer" data-bs-toggle="modal" data-bs-target="#addTime">
                                                    {mondaySlotchecked ? <>
                                                        <i class="fas fa-plus-circle me-3"></i>
                                                        <span onClick={() => this.setSelectSlotFor("monday")} >Add Time Slot</span>
                                                    </>
                                                        : <></>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 mt-4">
                                            <div class="d-flex align-items-center">
                                                <div class="time-slot">
                                                    {this.getDaySlotList(mondaySlot, false)}
                                                </div>
                                                {(mondaySlot.size > 0) ?
                                                    <div class="bg-gradiant d-flex align-items-center ps-4">
                                                        {/* <i class="fas fa-pen me-3 text-primary cursor-pointer" data-bs-toggle="modal" data-bs-target="#editTimeslot" onClick={() => this.setSelectSlotFor("monday")}></i> */}
                                                        {/* <i class="fas fa-trash text-danger cursor-pointer" onClick={() => this.setState({ ...this.state, mondaySlot: new Map(), mondaySlotchecked: false })}></i> */}
                                                        <i class="fas fa-trash text-danger cursor-pointer" data-bs-toggle="modal" data-bs-target="#editTimeslot" onClick={() => this.setSelectSlotFor("monday")}></i>
                                                    </div>
                                                    : <></>}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row gx-md-5 flex-lg-nowrap align-items-center">
                                        <div class="col-lg-6 mt-4">
                                            <div class="d-flex justify-content-between">
                                                <div class="form-check mb-0">
                                                    <input class="form-check-input me-4" type="checkbox" value="" id="checkBox-3" checked={tuesdaySlotchecked} name="tuesdaySlotchecked" onChange={(e) => this.setMyState(e.target.name, e.target.checked)} />
                                                    <label class="form-check-label text-uppercase" for="checkBox-3">Tuesday</label>
                                                </div>
                                                <div class="d-flex align-items-center text-primary cursor-pointer" data-bs-toggle="modal" data-bs-target="#addTime">
                                                    {tuesdaySlotchecked ? <>
                                                        <i class="fas fa-plus-circle me-3"></i>
                                                        <span onClick={() => this.setSelectSlotFor("tuesday")} >Add Time Slot</span>
                                                    </>
                                                        : <></>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 mt-4">
                                            <div class="d-flex align-items-center">
                                                <div class="time-slot">
                                                    {this.getDaySlotList(tuesdaySlot, false)}
                                                </div>
                                                {(tuesdaySlot.size > 0) ?
                                                    <div class="bg-gradiant d-flex align-items-center ps-4">
                                                        {/* <i class="fas fa-pen me-3 text-primary cursor-pointer" data-bs-toggle="modal" data-bs-target="#editTimeslot" onClick={() => this.setSelectSlotFor("tuesday")}></i> */}
                                                        {/* <i class="fas fa-trash text-danger cursor-pointer" onClick={() => this.setState({ ...this.state, tuesdaySlot: new Map(), tuesdaySlotchecked: false })}></i> */}
                                                        <i class="fas fa-trash text-danger cursor-pointer" data-bs-toggle="modal" data-bs-target="#editTimeslot" onClick={() => this.setSelectSlotFor("tuesday")} ></i>
                                                    </div>
                                                    : <></>}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row gx-md-5 flex-lg-nowrap align-items-center">
                                        <div class="col-lg-6 mt-4">
                                            <div class="d-flex justify-content-between">
                                                <div class="form-check mb-0">
                                                    <input class="form-check-input me-4" type="checkbox" value="" id="checkBox-4" checked={wednesdaySlotchecked} name="wednesdaySlotchecked" onChange={(e) => this.setMyState(e.target.name, e.target.checked)} />
                                                    <label class="form-check-label text-uppercase" for="checkBox-4">Wednesday</label>
                                                </div>
                                                <div class="d-flex align-items-center text-primary cursor-pointer" data-bs-toggle="modal" data-bs-target="#addTime">
                                                    {wednesdaySlotchecked ? <>
                                                        <i class="fas fa-plus-circle me-3"></i>
                                                        <span onClick={() => this.setSelectSlotFor("wednesday")} >Add Time Slot</span>
                                                    </>
                                                        : <></>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 mt-4">
                                            <div class="d-flex align-items-center">
                                                <div class="time-slot">
                                                    {this.getDaySlotList(wednesdaySlot, false)}
                                                </div>
                                                {(wednesdaySlot.size > 0) ?
                                                    <div class="bg-gradiant d-flex align-items-center ps-4">
                                                        {/* <i class="fas fa-pen me-3 text-primary cursor-pointer" data-bs-toggle="modal" data-bs-target="#editTimeslot" onClick={() => this.setSelectSlotFor("wednesday")}></i> */}
                                                        {/* <i class="fas fa-trash text-danger cursor-pointer" onClick={() => this.setState({ ...this.state, wednesdaySlot: new Map(), wednesdaySlotchecked: false })}></i> */}
                                                        <i class="fas fa-trash text-danger cursor-pointer" data-bs-toggle="modal" data-bs-target="#editTimeslot" onClick={() => this.setSelectSlotFor("wednesday")}></i>
                                                    </div>
                                                    : <></>}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row gx-md-5 flex-lg-nowrap align-items-center">
                                        <div class="col-lg-6 mt-4">
                                            <div class="d-flex justify-content-between">
                                                <div class="form-check mb-0">
                                                    <input class="form-check-input me-4" type="checkbox" value="" id="checkBox-5" checked={thursdaySlotchecked} name="thursdaySlotchecked" onChange={(e) => this.setMyState(e.target.name, e.target.checked)} />
                                                    <label class="form-check-label text-uppercase" for="checkBox-5">thursday</label>
                                                </div>
                                                <div class="d-flex align-items-center text-primary cursor-pointer" data-bs-toggle="modal" data-bs-target="#addTime">
                                                    {thursdaySlotchecked ? <>
                                                        <i class="fas fa-plus-circle me-3"></i>
                                                        <span onClick={() => this.setSelectSlotFor("thursday")} >Add Time Slot</span>
                                                    </>
                                                        : <></>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 mt-4">
                                            <div class="d-flex align-items-center">
                                                <div class="time-slot">
                                                    {this.getDaySlotList(thursdaySlot, false)}
                                                </div>
                                                {(thursdaySlot.size > 0) ?
                                                    <div class="bg-gradiant d-flex align-items-center ps-4">
                                                        {/* <i class="fas fa-pen me-3 text-primary cursor-pointer" data-bs-toggle="modal" data-bs-target="#editTimeslot" onClick={() => this.setSelectSlotFor("thursday")}></i> */}
                                                        {/* <i class="fas fa-trash text-danger cursor-pointer" onClick={() => this.setState({ ...this.state, thursdaySlot: new Map(), thursdaySlotchecked: false })}></i> */}
                                                        <i class="fas fa-trash text-danger cursor-pointer" data-bs-toggle="modal" data-bs-target="#editTimeslot" onClick={() => this.setSelectSlotFor("thursday")}></i>
                                                    </div>
                                                    : <></>}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row gx-md-5 flex-lg-nowrap align-items-center">
                                        <div class="col-lg-6 mt-4">
                                            <div class="d-flex justify-content-between">
                                                <div class="form-check mb-0">
                                                    <input class="form-check-input me-4" type="checkbox" value="" id="checkBox-6" checked={fridaySlotchecked} name="fridaySlotchecked" onChange={(e) => this.setMyState(e.target.name, e.target.checked)} />
                                                    <label class="form-check-label text-uppercase" for="checkBox-6">friday</label>
                                                </div>
                                                <div class="d-flex align-items-center text-primary cursor-pointer" data-bs-toggle="modal" data-bs-target="#addTime">
                                                    {fridaySlotchecked ? <>
                                                        <i class="fas fa-plus-circle me-3"></i>
                                                        <span onClick={() => this.setSelectSlotFor("friday")} >Add Time Slot</span>
                                                    </>
                                                        : <></>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 mt-4">
                                            <div class="d-flex align-items-center">
                                                <div class="time-slot">
                                                    {this.getDaySlotList(fridaySlot, false)}
                                                </div>
                                                {(fridaySlot.size > 0) ?
                                                    <div class="bg-gradiant d-flex align-items-center ps-4">
                                                        {/* <i class="fas fa-pen me-3 text-primary cursor-pointer" data-bs-toggle="modal" data-bs-target="#editTimeslot" onClick={() => this.setSelectSlotFor("friday")}></i> */}
                                                        {/* <i class="fas fa-trash text-danger cursor-pointer" onClick={() => this.setState({ ...this.state, fridaySlot: new Map(), fridaySlotchecked: false })}></i> */}
                                                        <i class="fas fa-trash text-danger cursor-pointer" data-bs-toggle="modal" data-bs-target="#editTimeslot" onClick={() => this.setSelectSlotFor("friday")}></i>
                                                    </div>
                                                    : <></>}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row gx-md-5 flex-lg-nowrap align-items-center">
                                        <div class="col-lg-6 mt-4">
                                            <div class="d-flex justify-content-between">
                                                <div class="form-check mb-0">
                                                    <input class="form-check-input me-4" type="checkbox" value="" id="checkBox-7" checked={saturdaySlotchecked} name="saturdaySlotchecked" onChange={(e) => this.setMyState(e.target.name, e.target.checked)} />
                                                    <label class="form-check-label text-uppercase" for="checkBox-7">saturday</label>
                                                </div>
                                                <div class="d-flex align-items-center text-primary cursor-pointer" data-bs-toggle="modal" data-bs-target="#addTime">
                                                    {saturdaySlotchecked ? <>
                                                        <i class="fas fa-plus-circle me-3"></i>
                                                        <span onClick={() => this.setSelectSlotFor("saturday")} >Add Time Slot</span>
                                                    </>
                                                        : <></>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 mt-4">
                                            <div class="d-flex align-items-center">
                                                <div class="time-slot">
                                                    {this.getDaySlotList(saturdaySlot, false)}
                                                </div>
                                                {(saturdaySlot.size > 0) ?
                                                    <div class="bg-gradiant d-flex align-items-center ps-4">
                                                        {/* <i class="fas fa-pen me-3 text-primary cursor-pointer" data-bs-toggle="modal" data-bs-target="#editTimeslot" onClick={() => this.setSelectSlotFor("saturday")}></i> */}
                                                        {/* <i class="fas fa-trash text-danger cursor-pointer" onClick={() => this.setState({ ...this.state, saturdaySlot: new Map(), saturdaySlotchecked: false })}></i> */}
                                                        <i class="fas fa-trash text-danger cursor-pointer" data-bs-toggle="modal" data-bs-target="#editTimeslot" onClick={() => this.setSelectSlotFor("saturday")}></i>
                                                    </div>
                                                    : <></>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5">
                                {((liveProfile ? liveProfile.bank_status : "") == 0) ?
                                    <button type="button" class="btn btn-danger px-5" onClick={() => { this.goToLink("profile/bank") }}>Complete Bank Account First</button>
                                    : loading ? <BootstrapSpinner /> :
                                        <button type="submit" class="btn btn-primary px-5" >Create New Post</button>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>



            {/* modal */}

            <div class="modal fade" id="editTimeslot" tabindex="-1" aria-labelledby="editTimeslot" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={(e) => { e.preventDefault(); }} >
                                <div class="modal-body">
                                    <div class="text-center mb-4">
                                        <h4 class="modal-title">Tap to remove</h4>
                                    </div>
                                    {this.getDaySlotList(this.getEditFor(), true)}

                                </div>
                                <div class="modal-footer justify-content-center py-4 border-0">
                                    <button type="button" id="selectDateModalBtnClose" class="btn btn-primary py-2 px-5" data-bs-dismiss="modal"  >DISMISS</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="addTime" tabindex="-1" aria-labelledby="addTimeLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={(e) => { e.preventDefault(); }} >
                                <div class="modal-body">
                                    <div class="text-center mb-4">
                                        <h4 class="modal-title">Select Time </h4>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Duration (minutes)</label>
                                        <input type="number" placeholder="Select Duration" className="form-control" step="30" name="start_time" min="30" max="1800" value={duration} onChange={(e) => this.changeDurationTime(e.target.value)} />
                                        {/* <input type="time" placeholder="Select Duration" className="form-control" name="start_time" min="00:30" value={duration_time} onChange={(e) => this.changeDurationTime(e.target.value)} /> */}
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Start Time</label>
                                        <input type="time" placeholder="Start Time" className="form-control" name="start_time" value={start_time} onChange={(e) => this.changeStartTime(e.target.value)} />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">End Time</label>
                                        <input type="time" placeholder="End Time" className="form-control" name="end_time" value={end_time} disabled />
                                    </div>
                                </div>
                                <div class="modal-footer justify-content-center py-4 border-0">
                                    <button type="button" id="selectDateModalBtnClose" class="btn btn-primary py-2 px-5" data-bs-dismiss="modal" onClick={() => this.initialiseSlot(start_time, end_time)}  >CONFIRM</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    }

    getEditFor = () => {
        const { selectSlotFor, sundaySlot, mondaySlot, tuesdaySlot, wednesdaySlot, thursdaySlot, fridaySlot, saturdaySlot } = this.state
        switch (selectSlotFor) {
            case "sunday":
                return sundaySlot
            case "monday":
                return mondaySlot
            case "tuesday":
                return tuesdaySlot
            case "wednesday":
                return wednesdaySlot
            case "thursday":
                return thursdaySlot
            case "friday":
                return fridaySlot
            case "saturday":
                return saturdaySlot
            default:
                return []
        }
    }
    initialiseSlot = (start_time, end_time) => {
        console.log("initialiseSlot selectSlotFor", start_time, end_time);
        const { selectSlotFor, sundaySlot, mondaySlot, tuesdaySlot, wednesdaySlot, thursdaySlot, fridaySlot, saturdaySlot } = this.state
        const mapKey = `${start_time}${end_time}`
        let rowTimeSlot;
        switch (selectSlotFor) {
            case "sunday":
                rowTimeSlot = sundaySlot
                if (rowTimeSlot.has(mapKey)) {
                    rowTimeSlot.delete(mapKey)
                } else {
                    rowTimeSlot.set(mapKey, { start_time: start_time, end_time: end_time })
                }
                this.setState({
                    ...this.state,
                    sundaySlot: rowTimeSlot,
                    start_time: "00:00",
                    duration: "30",
                    end_time: "00:30"
                })
                break;
            case "monday":
                rowTimeSlot = mondaySlot
                if (rowTimeSlot.has(mapKey)) {
                    rowTimeSlot.delete(mapKey)
                } else {
                    rowTimeSlot.set(mapKey, { start_time: start_time, end_time: end_time })
                }
                this.setState({
                    ...this.state,
                    mondaySlot: rowTimeSlot,
                    start_time: "00:00",
                    duration: "30",
                    end_time: "00:30"
                })
                break;
            case "tuesday":
                rowTimeSlot = tuesdaySlot
                if (rowTimeSlot.has(mapKey)) {
                    rowTimeSlot.delete(mapKey)
                } else {
                    rowTimeSlot.set(mapKey, { start_time: start_time, end_time: end_time })
                }
                this.setState({
                    ...this.state,
                    tuesdaySlot: rowTimeSlot,
                    start_time: "00:00",
                    duration: "30",
                    end_time: "00:30"
                })
                break;
            case "wednesday":
                rowTimeSlot = wednesdaySlot
                if (rowTimeSlot.has(mapKey)) {
                    rowTimeSlot.delete(mapKey)
                } else {
                    rowTimeSlot.set(mapKey, { start_time: start_time, end_time: end_time })
                }
                this.setState({
                    ...this.state,
                    wednesdaySlot: rowTimeSlot,
                    start_time: "00:00",
                    duration: "30",
                    end_time: "00:30"
                })
                break;
            case "thursday":
                rowTimeSlot = thursdaySlot
                if (rowTimeSlot.has(mapKey)) {
                    rowTimeSlot.delete(mapKey)
                } else {
                    rowTimeSlot.set(mapKey, { start_time: start_time, end_time: end_time })
                }
                this.setState({
                    ...this.state,
                    thursdaySlot: rowTimeSlot,
                    start_time: "00:00",
                    duration: "30",
                    end_time: "00:30"
                })
                break;

            case "friday":
                rowTimeSlot = fridaySlot
                if (rowTimeSlot.has(mapKey)) {
                    rowTimeSlot.delete(mapKey)
                } else {
                    rowTimeSlot.set(mapKey, { start_time: start_time, end_time: end_time })
                }
                this.setState({
                    ...this.state,
                    fridaySlot: rowTimeSlot,
                    start_time: "00:00",
                    duration: "30",
                    end_time: "00:30"
                })
                break;
            case "saturday":
                rowTimeSlot = saturdaySlot
                if (rowTimeSlot.has(mapKey)) {
                    rowTimeSlot.delete(mapKey)
                } else {
                    rowTimeSlot.set(mapKey, { start_time: start_time, end_time: end_time })
                }
                this.setState({
                    ...this.state,
                    saturdaySlot: rowTimeSlot,
                    start_time: "00:00",
                    duration: "30",
                    end_time: "00:30"
                })
                break;

            default:
                break;
        }

    }
    getDaySlotList = (params, b) => {
        let rowData = []
        params.forEach((element, index) => {
            console.log("getDaySlotList", element);
            rowData.push(<span key={index} class="time-btn me-3 cursor-pointer" onClick={() => b ? this.initialiseSlot(element.start_time, element.end_time) : ""} >{hhmmToampm(element.start_time)}-{hhmmToampm(element.end_time)}  </span>)
        });
        return rowData
    }
    setSelectSlotFor = (dayname) => {
        this.setState({
            ...this.state,
            selectSlotFor: dayname
        })
    }

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
    changeStartTime = (value) => {
        this.setState({
            ...this.state,
            start_time: value
        }, () => {
            this.getEndTime()
        })
    }
    getEndTime = () => {
        const { start_time, duration_time } = this.state
        let extra = 0
        let startArr = start_time.split(":")
        let durationTimeArr = duration_time.split(":")
        let st2 = Number(startArr[1]) + Number(durationTimeArr[1])
        if (st2 >= 60) {
            st2 -= 60
            extra = 1
        }
        let st1 = Number(startArr[0]) + Number(durationTimeArr[0]) + extra
        this.setMyState("end_time", `${(st1 > 9) ? st1 : `0${st1}`}:${(st2 > 9) ? st2 : `0${st2}`}`)
    }
    componentDidMount() {
        const { user_info } = this.props
        if (user_info) {
            agent.setToken(user_info.token)
        }
    }
}
export default CreatePost

