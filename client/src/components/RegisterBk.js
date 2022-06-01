// import { useRef, useState, useEffect } from "react";
// import axios from "../api/axios";
// import Select from "react-select";

// const USER_REGEX = /^\S[0-9a-zA-Z]{3,}$/;

// const REGISTER_URL = "/auth/signup";
// const CHECK_USERNAME_URL = "/auth/checkUserName";
// const GET_GROUPS_URL = "/group/getAllGroups";

// let existingGroups = [];

// const Register = ({
//   groups,
//   setGroups,
//   options,
//   pwd,
//   setPwd,
//   validPwd,
//   email,
//   setEmail,
//   validEmail,
// }) => {
//   const userRef = useRef();

//   const [userName, setUserName] = useState("");
//   const [validUserName, setValidUserName] = useState(false);
//   const [availableUserName, setAvailableUserName] = useState(false);

//   const [matchPwd, setMatchPwd] = useState("");
//   const [validMatch, setValidMatch] = useState(false);

//   // const [groups, setGroups] = useState([]);
//   // const [options, setOptions] = useState([]);

//   const [errMsg, setErrMsg] = useState("");

//   async function checkUserName() {
//     try {
//       const response = await axios.get(`${CHECK_USERNAME_URL}/${userName}`);
//       if (response?.data?.user) {
//         setAvailableUserName(false);
//       } else {
//         setAvailableUserName(true);
//       }
//     } catch (error) {
//       console.log(error.response.data);
//     }
//   }

//   useEffect(() => {
//     userRef.current.focus();
//   }, []);

//   useEffect(() => {
//     setErrMsg("");
//   }, [userName, pwd, matchPwd]);

//   useEffect(() => {
//     setValidUserName(USER_REGEX.test(userName));
//     if (validUserName) {
//       checkUserName();
//     }
//   }, [userName]);

//   useEffect(() => {
//     setValidMatch(pwd === matchPwd);
//   }, [pwd, matchPwd]);

//   //handleChange function
//   const handleChange = (selectedOptions) => {
//     // let value = Array.from(e.target.selectedOptions, (option) => option.value);
//     setGroups(selectedOptions);
//   };

//   //handleSubmit function
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(
//         REGISTER_URL,
//         JSON.stringify({
//           userName,
//           email,
//           password: pwd,
//           groups: groups.map((x) => x.value),
//         }),
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );
//     } catch (error) {
//       if (!error.response) {
//         setErrMsg("No server response");
//       } else if (error.response.status === 409) {
//         alert("user already registered");
//       } else {
//         alert("Registration failed");
//       }
//     }
//   };

//   return (
//     <section>
//       <p className="errMsg">{errMsg}</p>
//       <h2>Create New user</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             name="username"
//             id="username"
//             autoComplete="off"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             ref={userRef}
//           />
//           {userName && !validUserName && (
//             <small style={{ color: "red" }}>
//               Minimun 4 charactors are required
//             </small>
//           )}
//           {userName && validUserName && !availableUserName && (
//             <small style={{ color: "red" }}>Username is not available</small>
//           )}
//         </div>

//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             autoComplete="off"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           {email && !validEmail && (
//             <small style={{ color: "red" }}>Please enter a valid email</small>
//           )}
//         </div>

//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             value={pwd}
//             onChange={(e) => setPwd(e.target.value)}
//           />
//           {pwd && !validPwd && (
//             <small style={{ color: "red" }}>
//               8 to 10 characters.
//               <br />
//               Must include uppercase, lowercase letters, a number and a special
//               character.
//               <br />{" "}
//             </small>
//           )}
//         </div>

//         <div>
//           <label htmlFor="matchpassword">Confirm Password</label>
//           <input
//             type="password"
//             name="matchpassword"
//             id="matchpassword"
//             value={matchPwd}
//             onChange={(e) => setMatchPwd(e.target.value)}
//           />
//           {matchPwd && !validMatch && (
//             <small style={{ color: "red" }}>Password mismatch</small>
//           )}
//         </div>

//         <div>
//           <label htmlFor="groups">Groups</label>

//           <Select
//             name="groups"
//             isMulti={true}
//             value={groups}
//             options={options}
//             onChange={handleChange}
//           />
//         </div>

//         <button>Submit</button>
//       </form>
//     </section>
//   );
// };

// export default Register;