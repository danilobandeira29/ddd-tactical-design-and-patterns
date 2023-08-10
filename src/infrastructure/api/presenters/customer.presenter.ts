import {OutputListCustomerDto} from "../../../usecase/customer/list/list.customer.dto";
import {toXML} from "jstoxml"

export default class CustomerPresenter {
  static listXML(dto: OutputListCustomerDto): string {
      return toXML({
          customers: dto.customers.map(c => ({
                    customer: {
                        id: c.id,
                        name: c.name,
                        address: {
                            street: c.address.street,
                            city: c.address.city,
                            zip: c.address.zip,
                            number: c.address.number
                        }
                    }
              }))
      }, { header: true, indent: "  " });
  }
}
