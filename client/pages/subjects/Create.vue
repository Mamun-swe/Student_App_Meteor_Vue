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
                  <h4>Create Subject</h4>
                </div>
                <div class="flex-fill text-right">
                  <router-link
                    to="/subjects"
                    type="button"
                    class="btn shadow-sm"
                  >
                    <i class="fas fa-chevron-left"></i>
                  </router-link>
                </div>
              </div>
            </div>
            <!-- Card body -->
            <div class="card-body p-4">
              <form @submit.prevent="submitSubject">
                <!-- Name -->
                <div class="form-group mb-3">
                  <p v-if="errors.nameErr" class="text-danger">
                    {{ errors.nameErr }}
                  </p>
                  <p v-else>Name</p>
                  <input
                    type="text"
                    class="form-control shadow-none"
                    placeholder="Subject name"
                    v-model="subjectData.name"
                  />
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
export default {
  data() {
    return {
      subjectData: {
        name: "",
      },
      errors: {
        nameErr: "",
      },
    };
  },
  methods: {
    submitSubject() {
      // Validation
      if (!this.subjectData.name) {
        this.errors.nameErr = "Name required.";
      }

      if (this.subjectData.name) {
        Meteor.call("createSubject", this.subjectData, function (
          error,
          result
        ) {
          if (error) {
            console.log(error.errors);
          } else {
            Swal.fire({
              title: "Successfully",
              text: "Subject created.",
              icon: "success",
              confirmButtonText: "OK",
            });
            this.subjectData.name = "";
          }
        });
      }
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