// TODO: add language detect lib to set the text alignment
function Post() {
  return (
    <div className='h-fit w-full p-3 border-t border-b border-gray-200/10'>
      <div className='flex gap-2'>
        <img
          src={'/public/vite.svg'}
          alt=''
        />
        <div className=''>
          <h4 className='text-white'>طلال بالنوب</h4>
        </div>
      </div>
      <div className='mt-1'>
        <p className='text-right	leading-7'>
          التكنولوجيا الحديثة تشكل جزءًا أساسيًا من حياتنا اليومية، حيث تسهل
          التواصل والعمل والتعليم. من خلال الابتكارات المستمرة، نتمكن من مواجهة
          التحديات بطرق مبتكرة وفعالة. يبقى الاستخدام المسؤول لهذه الأدوات أمرًا
          ضروريًا لضمان تحقيق الفائدة القصوى منها، مع تقليل الآثار السلبية التي
          قد تنتج عن سوء استخدامها
        </p>
      </div>
    </div>
  )
}

export default Post
