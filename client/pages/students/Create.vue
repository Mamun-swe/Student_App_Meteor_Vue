<template>
  <div class="create">
    <div class="container py-4 py-lg-5">
      <div class="row">
        <div class="col-12 col-lg-6 m-auto">
          <!-- Student Add card -->
          <div class="card border-0 shadow">
            <!-- Card header -->
            <div class="card-header bg-white border-bottom p-4">
              <div class="d-flex">
                <div class="flex-fill text-right">
                  <h4>Create Student</h4>
                </div>
                <div class="flex-fill text-right">
                  <router-link to="/" type="button" class="btn shadow-sm">
                    <i class="fas fa-chevron-left"></i>
                  </router-link>
                </div>
              </div>
            </div>
            <!-- Card body -->
            <div class="card-body p-4">
              <form @submit.prevent="submitStudent">
                <!-- Name -->
                <div class="form-group mb-3">
                  <p v-if="errors.nameErr" class="text-danger">
                    {{ errors.nameErr }}
                  </p>
                  <p v-else>Name</p>
                  <input
                    type="text"
                    class="form-control shadow-none"
                    placeholder="Student name"
                    v-model="studentData.name"
                  />
                </div>

                <!-- E-mail -->
                <div class="form-group mb-3">
                  <p v-if="errors.emailErr" class="text-danger">
                    {{ errors.emailErr }}
                  </p>
                  <p v-else>E-mail</p>
                  <input
                    type="text"
                    class="form-control shadow-none"
                    placeholder="Student e-mail"
                    v-model="studentData.email"
                  />
                </div>

                <div class="row">
                  <!-- Phone -->
                  <div class="col-12 col-lg-6 pr-lg-2">
                    <div class="form-group mb-3">
                      <p v-if="errors.phoneErr" class="text-danger">
                        {{ errors.phoneErr }}
                      </p>
                      <p v-else>Phone</p>
                      <input
                        type="text"
                        class="form-control shadow-none"
                        placeholder="Student phone"
                        v-model="studentData.phone"
                      />
                    </div>
                  </div>

                  <!-- Date of birth -->
                  <div class="col-12 col-lg-6 pl-lg-2">
                    <div class="form-group mb-3">
                      <p v-if="errors.dobErr" class="text-danger">
                        {{ errors.dobErr }}
                      </p>
                      <p v-else>Date of birth</p>
                      <date-picker
                        class="w-100"
                        v-model="studentData.dob"
                        value-type="format"
                        format="DD-MM-YYYY"
                      ></date-picker>
                    </div>
                  </div>

                  <!-- Subjects -->
                  <div class="col-12">
                    <div class="form-group mb-4">
                      <p v-if="errors.subjectErr" class="text-danger">
                        {{ errors.subjectErr }}
                      </p>
                      <p v-else>Subject</p>
                      <multiselect
                        v-model="studentData.subjects"
                        :options="subjects"
                        :multiple="true"
                        label="name"
                        track-by="name"
                        placeholder="Select subject"
                      ></multiselect>
                    </div>
                  </div>
                </div>

                <button type="submit" class="btn shadow-none">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { Meteor } from "meteor/meteor";
import { Subjects } from "../../../imports/api/subject";
import Multiselect from "vue-multiselect";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  components: { Multiselect, DatePicker },
  data() {
    return {
      studentData: {
        name: "",
        email: "",
        phone: "",
        dob: "",
        subjects: [],
      },
      errors: {
        nameErr: "",
        emailErr: "",
        phoneErr: "",
        dobErr: "",
        subjectErr: "",
      },
    };
  },
  methods: {
    submitStudent() {
      // Validation
      if (!this.studentData.name) {
        this.errors.nameErr = "Name required.";
      }
      if (!this.studentData.email) {
        this.errors.emailErr = "E-mail is required.";
      } else if (this.studentData.email.indexOf("@gmail.com") < 0) {
        this.errors.emailErr = "Address is not valid.";
      }

      if (!this.studentData.phone) {
        this.errors.phoneErr = "Phone is required.";
      }

      if (!this.studentData.dob) {
        this.errors.dobErr = "Date of birth is required.";
      }

      if (this.studentData.subjects.length < 1) {
        this.errors.subjectErr = "Subject is required.";
      }

      if (
        this.studentData.name &&
        this.studentData.email &&
        this.studentData.phone &&
        this.studentData.dob &&
        this.studentData.subjects
      ) {
        let subjectIds = [];
        let subjectArr = this.studentData.subjects;
        for (let i = 0; i < subjectArr.length; i++) {
          subjectIds.push(subjectArr[i]._id);
        }
        let newData = {
          name: this.studentData.name,
          email: this.studentData.email,
          phone: this.studentData.phone,
          dob: this.studentData.dob,
          subjects: subjectIds,
        };

        Meteor.call("createStudent", newData, function (error, result) {
          if (error) {
            console.log(error);
          } else {
            this.errors = "";
            this.studentData = "";
            Swal.fire({
              title: "Successfully",
              text: "Student created.",
              icon: "success",
              confirmButtonText: "OK",
            });
          }
        });
      }
    },
  },
  meteor: {
    subjects() {
      return Subjects.find({}).fetch();
    },
  },
};
</script>
<style lang="css" scoped>
.create .card {
  overflow: hidden;
  border-radius: 6px;
}
/* Card header */
.create .card .card-header h4 {
  color: #000;
  margin-top: 5px;
  font-weight: 700;
  margin-bottom: 0;
  text-transform: capitalize;
  font-family: "Roboto", sans-serif;
}
.create .card .card-header .btn {
  padding-top: 8px;
  padding-bottom: 2px;
  background: #e42672;
}
.create .card .card-header .btn i {
  font-size: 20px;
  color: #fff;
}
/* Crad body/Form */
.create .card .card-body form .form-group p {
  font-size: 13px;
  margin-left: 3px;
  font-weight: 400;
  margin-bottom: 3px;
  font-family: "Roboto", sans-serif;
}
.create .card .card-body form .form-control {
  color: #000;
  font-size: 14px;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
}
.create .card .card-body form .form-control:focus {
  border: 1px solid #e42672;
}
.create .card .card-body form .btn {
  float: right;
  color: #fff;
  font-weight: 500;
  padding: 6px 15px;
  font-family: "Roboto", sans-serif;
  background: #e42672;
}
</style>