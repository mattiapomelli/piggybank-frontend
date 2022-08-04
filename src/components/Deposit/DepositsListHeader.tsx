const DepositsListHeader = () => {
  return (
    <thead className="text-sm  text-gray-500 dark:text-gray-300">
      <tr
        role="row"
        style={{ display: 'flex', flex: '1 0 auto', minWidth: '880px' }}
      >
        <th
          colSpan={1}
          role="columnheader"
          title="Toggle SortBy"
          className="group bg-white px-2 py-5 font-normal first:rounded-bl-lg last:rounded-br-lg ltr:first:pl-8 ltr:last:pr-8 rtl:first:pr-8 rtl:last:pl-8 dark:bg-light-dark md:px-4"
          style={{
            position: 'relative',
            boxSizing: 'border-box',
            flex: '180 0 auto',
            minWidth: '180px',
            width: '180px',
          }}
        >
          <div className="flex items-center">
            Deposit name
            <div
              draggable="false"
              role="separator"
              className="resizer "
              style={{ cursor: 'col-resize' }}
            ></div>
            <span className="ltr:ml-1 rtl:mr-1"></span>
          </div>
        </th>
        <th
          colSpan={1}
          role="columnheader"
          title="Toggle SortBy"
          className="group bg-white px-2 py-5 font-normal first:rounded-bl-lg last:rounded-br-lg ltr:first:pl-8 ltr:last:pr-8 rtl:first:pr-8 rtl:last:pl-8 dark:bg-light-dark md:px-4"
          style={{
            position: 'relative',
            boxSizing: 'border-box',
            flex: '160 0 auto',
            minWidth: '160px',
            width: '160px',
          }}
        >
          <div className="flex items-center">
            <div className="ltr:ml-auto rtl:mr-auto">Deposit Date</div>
            <div
              draggable="false"
              role="separator"
              className="resizer "
              style={{ cursor: 'col-resize' }}
            ></div>
            <span className="ltr:ml-1 rtl:mr-1"></span>
          </div>
        </th>
        <th
          colSpan={1}
          role="columnheader"
          title="Toggle SortBy"
          className="group bg-white px-2 py-5 font-normal first:rounded-bl-lg last:rounded-br-lg ltr:first:pl-8 ltr:last:pr-8 rtl:first:pr-8 rtl:last:pl-8 dark:bg-light-dark md:px-4"
          style={{
            position: 'relative',
            boxSizing: 'border-box',
            flex: '160 0 auto',
            minWidth: '160px',
            width: '160px',
          }}
        >
          <div className="flex items-center">
            <div className="ltr:ml-auto rtl:mr-auto">Withdrawal Date</div>
            <div
              draggable="false"
              role="separator"
              className="resizer "
              style={{ cursor: 'col-resize' }}
            ></div>
            <span className="ltr:ml-1 rtl:mr-1"></span>
          </div>
        </th>

        <th
          colSpan={1}
          role="columnheader"
          title="Toggle SortBy"
          className="group bg-white px-2 py-5 font-normal first:rounded-bl-lg last:rounded-br-lg ltr:first:pl-8 ltr:last:pr-8 rtl:first:pr-8 rtl:last:pl-8 dark:bg-light-dark md:px-4"
          style={{
            position: 'relative',
            boxSizing: 'border-box',
            flex: '100 0 auto',
            minWidth: '100px',
            width: '100px',
          }}
        >
          <div className="flex items-center">
            <div className="ltr:ml-auto rtl:mr-auto">Amount</div>
            <div draggable="false" role="separator" className="resizer"></div>
            <span className="ltr:ml-1 rtl:mr-1"></span>
          </div>
        </th>
        <th
          colSpan={1}
          role="columnheader"
          title="Toggle SortBy"
          className="group bg-white px-2 py-5 font-normal first:rounded-bl-lg last:rounded-br-lg ltr:first:pl-8 ltr:last:pr-8 rtl:first:pr-8 rtl:last:pl-8 dark:bg-light-dark md:px-4"
          style={{
            position: 'relative',
            boxSizing: 'border-box',
            flex: '200 0 auto',
            minWidth: '200px',
            width: '200px',
          }}
        >
          <div className="flex items-center">
            <div
              draggable="false"
              role="separator"
              className="resizer "
              style={{ cursor: 'col-resize' }}
            ></div>
            <span className="ltr:ml-1 rtl:mr-1"></span>
          </div>
        </th>
      </tr>
    </thead>
  )
}

export default DepositsListHeader
